import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const TableData = ({data}) => {
    const leads = Array.isArray(data)
    ? data
    : data?.leads || [];

    console.log("Rendering TableData with leads:", leads);

  return (
    <div className="flex justify-center ">
        <div className="w-full max-w-6xl">
         <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>LinkedIn Profile</TableCell>
                <TableCell>Email</TableCell>

            </TableRow>
            </TableHead>

            <TableBody>
            {leads.map((lead, index) => (
                <TableRow key={index}>
                <TableCell>{lead.name}</TableCell>

                <TableCell>{lead.jobTitle}</TableCell>

                <TableCell>{lead.companyName}</TableCell>

                <TableCell>
                    <a
                    href={lead.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                    >
                    View Profile
                    </a>
                </TableCell>
                <TableCell>{lead.email || "Not Found"}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
    </div>
  
  );
};

export default TableData;