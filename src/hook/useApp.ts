"use client"
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const useApp = () => useContext(AppContext)

export default useApp