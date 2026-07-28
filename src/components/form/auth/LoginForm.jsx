
export default function LoginForm() {
  return (
    <>
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 bg-white shadow rounded-xl-lg">
      <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>


      <form className="space-y-4">
        <input type="text"
                placeholder="Username"
                className="w-full p-3 border roounded-lg"/>
                  <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
          />
          <button
          className="w-full p-3 text-white bg-blue-600 rounded-lg"
          >Login</button>
      </form>
    </div>
     </div>
    </>
  )
}
