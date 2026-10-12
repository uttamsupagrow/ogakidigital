"use client";

import { useState } from "react";
import styled from "styled-components";
import { trackEvent } from "@/lib/analytics/events";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  max-width: 42rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.8rem;
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.typography.small};
  color: inherit;
  &::placeholder {
    color: currentColor;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: ${({ theme }) => theme.typography.micro};
  }
`;

const Submit = styled.button`
  background: none;
  border: none;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.typography.label};
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: inherit;
  transition: opacity 0.3s ease, transform 0.3s ease;
  &:hover {
    opacity: 0.7;
    transform: translateX(2px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: wait;
  }
`;

const ErrorMsg = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.typography.micro};
  color: #e58f8b;
`;

const Success = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: ${({ theme }) => theme.typography.bodyLead};
`;

export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      setStatus("done");
      trackEvent("newsletter_signup");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return <Success>You&#96;re in! Thanks for subscribing!</Success>;
  }

  return (
    <Form onSubmit={onSubmit} noValidate>
      <Row>
        <label className="visually-hidden" htmlFor={`nl-${dark ? "d" : "l"}`}>
          Email
        </label>
        <Input
          id={`nl-${dark ? "d" : "l"}`}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          autoComplete="email"
          required
        />
        <Submit type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Get In Touch"}
        </Submit>
      </Row>
      {status === "error" && <ErrorMsg role="alert">{message}</ErrorMsg>}
    </Form>
  );
}
