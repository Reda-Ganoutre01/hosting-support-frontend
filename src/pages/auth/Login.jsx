import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { Link, useNavigate } from 'react-router-dom';


export const Login = () => {
    const [error, setError] = useState(null);
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


  const submit =async(e)=>{
    e.preventDefault();
     setError(null);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Sign in to Hosting Support</h2>

        <form onSubmit={submit} className='space-y-4'>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
           <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
          />

           <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/forgot" className="text-sm text-blue-600">
              Forgot?
            </Link>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          <div className="text-sm text-center">
            Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
          </div>
        </form>
    </Card>

    </div>
    
    </>
  )
}
