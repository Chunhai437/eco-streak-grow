import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export const AdminNews = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    type: "Sự kiện cộng đồng",
  });

  const [editingEvent, setEditingEvent] = useState({
    id: 0,
    title: "",
    description: "",
    location: "",
    date: "",
    type: "Sự kiện cộng đồng",
  });

  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false);
  const [events] = useState([
    {
      id: 1,
      title: "Ngày Trái Đất 2024",
      type: "Sự kiện cộng đồng",
      date: "22/04/2024",
      participants: 150,
      status: "Sắp diễn ra",
    },
    {
      id: 2,
      title: "Workshop Tái Chế",
      type: "Đối tác",
      date: "15/04/2024",
      participants: 45,
      status: "Đang diễn ra",
    },
    {
      id: 3,
      title: "Chợ Xanh Cuối Tuần",
      type: "Quán đối tác",
      date: "20/04/2024",
      participants: 89,
      status: "Hoàn thành",
    },
  ]);
  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.description) return;

    toast({
      title: "Tạo sự kiện thành công!",
      description: `Sự kiện "${newEvent.title}" đã được thêm vào trang chủ.`,
    });

    setNewEvent({
      title: "",
      description: "",
      location: "",
      date: "",
      type: "Sự kiện cộng đồng",
    });
  };

  const handleEditEvent = (event) => {
    setEditingEvent({
      id: event.id,
      title: event.title,
      description: "", // Will be loaded from backend in real app
      location: "", // Will be loaded from backend in real app
      date: event.date,
      type: event.type,
    });
    setIsEditEventDialogOpen(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent.title || !editingEvent.description) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive",
      });
      return;
    }

    console.log("Updating event with data:", editingEvent);

    toast({
      title: "Cập nhật sự kiện thành công!",
      description: `Sự kiện "${editingEvent.title}" đã được cập nhật.`,
    });

    setIsEditEventDialogOpen(false);
    setEditingEvent({
      id: 0,
      title: "",
      description: "",
      location: "",
      date: "",
      type: "Sự kiện cộng đồng",
    });
  };
  return (
    <>
      {/* Create New Event */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tạo sự kiện nổi bật
          </CardTitle>
          <CardDescription>Thêm sự kiện mới vào trang chủ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Tiêu đề sự kiện"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newEvent.type}
              onChange={(e) =>
                setNewEvent({ ...newEvent, type: e.target.value })
              }
            >
              <option>Sự kiện cộng đồng</option>
              <option>Đối tác</option>
              <option>Quán đối tác</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Địa điểm"
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
            />
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
          </div>
          <Textarea
            placeholder="Mô tả sự kiện"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          />
          <Button
            onClick={handleCreateEvent}
            className="gradient-green text-white"
          >
            Tạo sự kiện
          </Button>
        </CardContent>
      </Card>

      {/* Existing Events */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-green-800">Danh sách sự kiện</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-green-800">
                      {event.title}
                    </h4>
                    <Badge variant="secondary">{event.type}</Badge>
                    <Badge variant="outline">{event.status}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    📅 {event.date} • 👥 {event.participants} người tham gia
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditEvent(event)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Existing Events */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-green-800">Danh sách sự kiện</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-green-800">
                      {event.title}
                    </h4>
                    <Badge variant="secondary">{event.type}</Badge>
                    <Badge variant="outline">{event.status}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    📅 {event.date} • 👥 {event.participants} người tham gia
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Event Dialog */}
      <Dialog
        open={isEditEventDialogOpen}
        onOpenChange={setIsEditEventDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-green-800">
              Chỉnh sửa sự kiện
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tiêu đề sự kiện *
                </label>
                <Input
                  placeholder="Tiêu đề sự kiện"
                  value={editingEvent.title}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Loại sự kiện
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={editingEvent.type}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, type: e.target.value })
                  }
                >
                  <option value="Sự kiện cộng đồng">Sự kiện cộng đồng</option>
                  <option value="Đối tác">Đối tác</option>
                  <option value="Quán đối tác">Quán đối tác</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Địa điểm
                </label>
                <Input
                  placeholder="Địa điểm"
                  value={editingEvent.location}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Ngày diễn ra
                </label>
                <Input
                  type="date"
                  value={editingEvent.date}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, date: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mô tả sự kiện *
              </label>
              <Textarea
                placeholder="Mô tả sự kiện"
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditEventDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={handleUpdateEvent}
                className="gradient-green text-white"
              >
                Cập nhật
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
