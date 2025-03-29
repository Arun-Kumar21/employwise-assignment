export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl">
        <div className="w-full flex flex-col p-2">
          <h1 className="text-xl my-2 font-semibold">
            Assignment: CRUD Operation with Reqres API
          </h1>
          <p className="my-2">
            <strong>Overview:</strong> This project is a simple React
            application that demonstrates CRUD (Create, Read, Update, Delete)
            operations using the Reqres API.
          </p>

          <h1 className="font-semibold my-2">Features:</h1>
          <ul className="list-decimal ps-4">
            <li>Localstorage based authentication.</li>
            <li>Fetch and display a list of users.</li>
            <li>Update personal profile.</li>
            <li>Delete user.</li>
          </ul>

          <Installation />

          <div className="my-4">
            <h1 className="font-semibold my-2 text-red-400">Note:</h1>
            <p>
              Updating the current user profile and deleting user details rely
              on global state management. Please note that refreshing the page
              will reload the actual data from the Reqres API.
            </p>
          </div>

          <div className="my-4">
            <h1 className="font-semibold my-2">Tech Used:</h1>
            <ul className="list-disc pl-5">
              <li>ReactJS</li>
              <li>Tailwind CSS</li>
              <li>ShadCN</li>
              <li>Zustand</li>
              <li>Axios</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const Installation = () => {
  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold mb-4">Installation Guide</h2>
      <ol className="list-decimal pl-5 space-y-2">
        <li>
          <code>git clone https://github.com/your-repo-link.git</code>
          <br />
          <span className="text-gray-500">Clone the repository</span>
        </li>
        <li>
          <code>cd your-project-folder</code>
          <br />
          <span className="text-gray-500">
            Navigate to the project directory
          </span>
        </li>
        <li>
          <code>npm install</code>
          <br />
          <span className="text-gray-500">Install dependencies</span>
        </li>
        <li>
          Create a <code>.env</code> file in the root directory and add:
          <pre className="bg-gray-100 p-2 rounded mt-1">
            VITE_SERVER_URL=https://reqres.in
          </pre>
        </li>
        <li>
          <code>npm run dev</code>
          <br />
          <span className="text-gray-500">Start the development server</span>
        </li>
        <li>
          Open <code>http://localhost:5173/</code> in your browser
        </li>
      </ol>
    </div>
  );
};
