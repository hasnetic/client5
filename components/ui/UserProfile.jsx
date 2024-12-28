// components/UserProfile.js
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User as UserIcon, 
  Mail, 
  Award, 
  Calendar 
} from "lucide-react";

export default function UserProfile({ user }) {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <UserIcon className="mr-2 text-muted-foreground" />
              <span className="font-semibold">Username:</span>
              <span className="ml-2">{user.username}</span>
            </div>

            <div className="flex items-center">
              <Mail className="mr-2 text-muted-foreground" />
              <span className="font-semibold">Email:</span>
              <span className="ml-2">{user.email}</span>
            </div>

            <div className="flex items-center">
              <Award className="mr-2 text-muted-foreground" />
              <span className="font-semibold">Role:</span>
              <Badge variant="secondary" className="ml-2">
                {user.role}
              </Badge>
            </div>

            <div className="flex items-center">
              <Calendar className="mr-2 text-muted-foreground" />
              <span className="font-semibold">Created At:</span>
              <span className="ml-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}