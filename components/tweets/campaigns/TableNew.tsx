import React, { useEffect, useState } from "react";

interface AccountGroup {
  name: string;
  in_campaign: boolean;
  campaign: number | null;
  group_main_type: string;
  group_sub_type: string;
  group_add: boolean;
  pk: number;
  detail_url: string;
}

const AccountGroupTable: React.FC = () => {
  const [accountGroups, setAccountGroups] = useState<AccountGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountGroups = async () => {
      const response = await fetch(
        "https://tweetaraby.xyz/api_admin/accounts/accountgroup/list/"
      );
      const data: AccountGroup[] = await response.json();
      setAccountGroups(data);
      setLoading(false);
    };

    fetchAccountGroups();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (accountGroups.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>In Campaign</th>
          <th>Campaign</th>
          <th>Main Type</th>
          <th>Sub Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {accountGroups.map((group) => (
          <tr key={group.pk}>
            <td>{group.name}</td>
            <td>{group.in_campaign ? "Yes" : "No"}</td>
            <td>{group.campaign ?? "N/A"}</td>
            <td>{group.group_main_type}</td>
            <td>{group.group_sub_type}</td>
            <td>
              <a
                href={group.detail_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Details
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AccountGroupTable;
