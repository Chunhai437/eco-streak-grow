import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Check, Edit, Trash2, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { deleteUser, getAllUsers, updateUser, User } from "@/services/UserApi";
import { set } from "date-fns";
import { verify } from "crypto";
import { verifyEmail } from "@/services/AuthApi";
import { Spinner } from "./Spinner/Spinner";

export const AdminUser = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  // New user management state
  const [users, setUsers] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoadingPage(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast({
        title: "Không thể tải danh sách người dùng",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchUsers();
    }
  }, [user, isAdmin]);

  const handleVerifyUser = async (
    token: string,
    fullname: string,
    isVerified: boolean
  ) => {
    if (isVerified) return alert("Tài khoản này đã được xác nhận!");
    if (!window.confirm("Bạn có chắc chắn muốn xác nhận tài khoản này?"))
      return;
    try {
      await verifyEmail(token);
      toast({
        title: "Xác nhận tài khoản thành công!",
        description: `Thông tin của người dùng "${fullname}" đã được xác nhận.`,
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: "Không thể xác nhận tài khoản này!",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?"))
      return;

    try {
      await deleteUser(id);
      toast({
        title: "Đã xóa tài khoản",
        description: "Tài khoản đã được xóa thành công.",
      });
      fetchUsers(); // Refresh danh sách
    } catch (error) {
      toast({
        title: "Lỗi xóa tài khoản",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loadingPage || !user) {
    return <Spinner />;
  }

  return (
    <>
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Quản lý người dùng
          </CardTitle>
          <CardDescription>
            Danh sách và quản lý tất cả người dùng trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên đăng nhập</TableHead>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>SĐT</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users
                  .filter((userData) => userData.role === "user")
                  .map((userData) => (
                    <TableRow key={userData._id}>
                      <TableCell className="font-medium">
                        {userData.username}
                      </TableCell>
                      <TableCell>{userData.fullname}</TableCell>
                      <TableCell>{userData.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Người dùng</Badge>
                      </TableCell>
                      <TableCell>{userData.phoneNumber}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            userData.isVerified ? "default" : "destructive"
                          }
                          className={userData.isVerified ? "bg-green-500" : ""}
                        >
                          {userData.isVerified
                            ? "Đã xác thực"
                            : "Chưa xác thực"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(userData.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleVerifyUser(
                                userData.verificationToken,
                                userData.fullname,
                                userData.isVerified
                              )
                            }
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteUser(userData._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
