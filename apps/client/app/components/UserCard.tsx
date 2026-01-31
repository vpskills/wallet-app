const UserCard = ({ user }: { user: any }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-xl font-semibold mb-4">User Information</h2>
      <div className="space-y-2">
        {user.image && (
          <div className="mb-4">
            <img 
              src={user.image} 
              alt={user.name || "User"} 
              className="w-20 h-20 rounded-full"
            />
          </div>
        )}
        <div>
          <span className="font-medium">Name:</span> {user.name || "N/A"}
        </div>
        <div>
          <span className="font-medium">Email:</span> {user.email || "N/A"}
        </div>
        <div>
          <span className="font-medium">User ID:</span> {user.id}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
