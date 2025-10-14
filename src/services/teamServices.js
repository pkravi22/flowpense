import api from "./api";

export const teamServices = {
  teamCreation: async ({ teamData, token }) => {
    console.log(teamData);

    const data = api.post("api/teams/create-team", teamData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
  addteamMember: async ({ token, employeeId, teamId }) => {
    console.log("lets add team member", token, employeeId);
    console.log(typeof employeeId);
    const data = api.post(
      `api/teams/add-member/${teamId}`,
      {
        employeeId: employeeId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
  addEmployee: async ({ token, employeeData }) => {
    console.log(employeeData);
    const payload = {};
    const data = api.post(`api/teams/add-employee`, employeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
  getAllEmployees: async ({ token }) => {
    console.log("token in service for employees", token);
    const data = api.get(
      "api/teams/get-employee",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
  getAllTeams: async ({ token }) => {
    console.log("token in service", token);
    const data = api.get(
      "api/teams/get-all/teams",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
  updateTeam: async ({ token, id }) => {
    const data = api.post(
      `api/teams/update/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },

  deleteTeam: async ({ token, id }) => {
    const data = api.post(
      `api/approvals/all-expenses/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
};
