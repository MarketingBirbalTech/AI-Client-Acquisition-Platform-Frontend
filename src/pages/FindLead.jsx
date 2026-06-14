import React, { useState } from 'react'
import FindleadForm from './FindleadForm'
import { useForm } from 'react-hook-form'
import { getLinkedInProfilesBySerper } from "../service/serperapiservice";
import { enrichLeadsWithGrok } from '../service/grokApiService';
import { getCompanyDomain } from '../service/hunterDomainService';
import { getEmail } from '../service/hunterEmailService';
import TableData from '../components/TableData';

const FindLead = () => {
  const [leads, setLeads] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("leads")) || [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { control, handleSubmit, formState: { errors } } = useForm();

  const safeParseDomain = async (companyName) => {
    if (!companyName) return "Not Found";
    try {
      const domain = await getCompanyDomain(companyName);
      return domain || "Not Found";
    } catch {
      return "Not Found";
    }
  };

  const safeGetEmail = async (name, domain) => {
    if (!name || !domain || domain === "Not Found") return "Not Found";
    try {
      const emailInfo = await getEmail(name, domain);
      return emailInfo?.email || "Not Found";
    } catch {
      return "Not Found";
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    const payload = {
      jobTitle: data?.jobTitle?.value || null,
      industry: data?.industry?.value || null,
      location: data?.location?.value || null,
      companySize: data?.companySize?.value || null,
      seniority: data?.seniority?.value || null,
      numberOfLeads: data?.numberOfLeads || null,
    };

    try {
      const response = await getLinkedInProfilesBySerper(
        payload.jobTitle,
        payload.industry,
        payload.location,
        payload.seniority
      );

      if (!response?.organic) {
        setError("No results found from LinkedIn search.");
        return;
      }

      const enriched = await enrichLeadsWithGrok(response.organic);

      if (!enriched?.profiles?.length) {
        setError("No profiles could be enriched.");
        return;
      }

      console.log({enriched});

      const leadsWithEmails = await Promise.all(
        enriched.profiles.map(async (lead) => {
          const domain = await safeParseDomain(lead?.companyName);
          const email = await safeGetEmail(lead?.name, domain);

          return {
            name: lead?.name || "Not Found",
            jobTitle: lead?.designation || "Not Found",
            companyName: lead?.companyName || "Not Found",
            location: lead?.location || "Not Found",
            linkedinUrl: lead?.linkedinUrl || "Not Found",
            domain,
            email,
          };
        })
      );


      try {
        localStorage.setItem("leads", JSON.stringify(leadsWithEmails));
      } catch (storageError) {
        console.warn("Could not save to localStorage:", storageError);
      }

      setLeads(leadsWithEmails);
    } catch (err) {
      console.error("Error in lead generation pipeline:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="px-4 md:px-8 lg:px-24">
      <FindleadForm
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="mt-6 text-center text-gray-500 text-sm animate-pulse">
          Fetching and enriching leads, please wait...
        </div>
      )}

      {!isLoading && (
        <TableData data={leads} />
      )}
    </section>
  );
};

export default FindLead;