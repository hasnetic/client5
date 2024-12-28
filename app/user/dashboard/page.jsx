
import { LogoutButton } from './LogoutButton';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User as UserIcon, 
  Mail, 
  Award, 
  Calendar 
} from "lucide-react"



export default async function UserDashboard() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;


  if (!token) {
    redirect('/login');
  }

  try {
  
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'your-secret-key'
    );

  
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/profile`, {
      method: 'GET',
      headers: {
        'Cookie': `token=${token}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store' 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const user = await response.json();

    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-md mx-auto">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage 
                src={`https://ui-avatars.com/api/?name=${user.username}`} 
                alt={user.username} 
              />
              <AvatarFallback>
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold">{user.username}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {user.email}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Mail className="text-muted-foreground" size={20} />
                  <span>Email</span>
                </div>
                <span>{user.email}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Award className="text-muted-foreground" size={20} />
                  <span>Role</span>
                </div>
                <Badge variant="outline">{user.role}</Badge>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Calendar className="text-muted-foreground" size={20} />
                  <span>Joined</span>
                </div>
                <span>
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {user.artype && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="text-muted-foreground" size={20} />
                    <span>Art Type</span>
                  </div>
                  <Badge variant="secondary">{user.artype}</Badge>
                </div>
              )}
            </div>
            <div className='mt-6'>
              <LogoutButton />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    redirect('/login');
  }
}