"use client";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
export default function CreateApiKey() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (email.length === 0) {
        toast.error("Please, enter an email.")
        return
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        toast.error("Please, enter a valid email.")
        return
      }
      const response = await axios.post("/api/createApiKey", { email });
      const text = response.statusText
      toast.success(text)
      if (response.status === 200) {
        setEmail("")
      }
    } catch (error) {
      console.error("Error creating API Key:", error);
      toast.error("Error creating API Key")
    }
  };

  return (
    <form className="flex mb-6 space-x-4" onSubmit={handleSubmit}>
      <input
          autoComplete="off"

        type="text"
        placeholder="Enter your email..."
        className="flex-1 px-4 py-3 leading-none text-base border border-primary rounded-lg focus:outline-none bg-transparent"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
      />
      <button
        className="inline-block px-5 py-2 text-background rounded focus:outline-none bg-primary hover:bg-first-hover transition-one"
        type="submit"
      >
        Get started
      </button>
    </form>
  );
}
