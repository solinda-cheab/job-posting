import { Shield, Ban, UserCheck, Trash2, Users } from "lucide-react";
import Table from "../../../components/ui/Table";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { useUsers, useBanUser, useUnbanUser, useDeleteUser } from "../hooks/useAdminStats";

export default function UserManagementTable() {
  const { data, isLoading } = useUsers({ limit: 50 });
  const users = data?.users || [];
  const banMutation = useBanUser();
  const unbanMutation = useUnbanUser();
  const deleteMutation = useDeleteUser();

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">User Management</h2>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>User</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-4 w-4 text-gray-500" />
                  </div>
                  <span className="font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                <Badge variant="secondary">{user.role}</Badge>
              </Table.Cell>
              <Table.Cell>
                {user.isBanned ? (
                  <Badge variant="danger">Banned</Badge>
                ) : (
                  <Badge variant="success">Active</Badge>
                )}
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-1">
                  {user.isBanned ? (
                    <button
                      onClick={() => unbanMutation.mutate(user.id)}
                      className="rounded-md p-1 text-green-600 hover:bg-green-50"
                      title="Unban User"
                    >
                      <UserCheck className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => banMutation.mutate(user.id)}
                      className="rounded-md p-1 text-yellow-600 hover:bg-yellow-50"
                      title="Ban User"
                    >
                      <Ban className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMutation.mutate(user.id)}
                    className="rounded-md p-1 text-red-600 hover:bg-red-50"
                    title="Delete User"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

