"use client";
import React from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

export default function Logout() {
  const { logout, currentUser } = useAuth();
  if (!currentUser) {
    return null;
  }
  return <Button text="Logout" clickHandler={logout} />;
}
