import React from "react";
import { Controller } from "react-hook-form";
import { Autocomplete, Button, TextField } from "@mui/material";
import {
  jobTitleOptions,
  industryOptions,
  locationOptions,
  companySizeOptions,
  seniorityOptions,
} from "../constants/formoptions";

const FindleadForm = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-5">
      <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
        Find Your Perfect Leads
      </h1>

      <p className="max-w-2xl font-medium text-center text-gray-600">
        Search thousands of verified professionals by job title, industry,
        location, and more.
      </p>

      <div className="w-full max-w-6xl shadow-2xl border border-gray-300 p-10 rounded-lg mt-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Controller
              name="jobTitle"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Autocomplete
                  options={jobTitleOptions}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Job Title" />
                  )}
                />
              )}
            />

            <Controller
              name="industry"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Autocomplete
                  options={industryOptions}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Industry" />
                  )}
                />
              )}
            />

            <Controller
              name="location"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Autocomplete
                  options={locationOptions}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Location" />
                  )}
                />
              )}
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Controller
              name="companySize"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Autocomplete
                  options={companySizeOptions}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Company Size" />
                  )}
                />
              )}
            />

            <Controller
              name="seniority"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Autocomplete
                  options={seniorityOptions}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Seniority" />
                  )}
                />
              )}
            />

            <Controller
              name="numberOfLeads"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Autocomplete
                  options={[1, 5, 10]}
                  getOptionLabel={(option) => `${option} Leads`}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Number of Leads" />
                  )}
                />
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button variant="contained" type="submit">
              Search Leads
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindleadForm;