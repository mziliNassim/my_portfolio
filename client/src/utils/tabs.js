import { Code, Settings, Image, Users } from "lucide-react";
import { Building, Calendar } from "lucide-react";

export const projectTabs = [
  { id: "basic", label: "Basic Info", icon: Code },
  { id: "collaborators", label: "Collaborators", icon: Users },
  { id: "media", label: "Media", icon: Image },
  { id: "settings", label: "Settings", icon: Settings },
];

export const experinecTabs = [
  { id: "general", label: "General Info", icon: Building },
  { id: "details", label: "Details", icon: Code },
  { id: "timeline", label: "Timeline", icon: Calendar },
];
