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
import { Edit, Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  createPlace,
  deletePlace,
  getAllPlaces,
  Place,
  updatePlace,
} from "@/services/PlaceApi";
import { Spinner } from "./Spinner/Spinner";
import ImageUploader from "./ImageLoader";

export const AdminPlace = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [newPlace, setNewPlace] = useState({
    name: "",
    description: "",
    type: "coffee",
    address: "",
    latitude: 0,
    longitude: 0,
    image: "",
    greenTags: "",
    voucherName: "",
    voucherDescription: "",
    pointsRequired: 0,
  });

  const [editingPlace, setEditingPlace] = useState({
    _id: "",
    name: "",
    description: "",
    type: "coffee",
    address: "",
    latitude: 0,
    longitude: 0,
    image: "",
    greenTags: "",
    vouchers: [
      {
        name: "",
        description: "",
        pointsRequired: 0,
      },
    ],
  });

  const [isEditPlaceDialogOpen, setIsEditPlaceDialogOpen] = useState(false);
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    try {
      setLoadingPage(true);
      const data = await getAllPlaces();
      setPlaces(data);
    } catch (error) {
      toast({
        title: "Lỗi khi tải địa điểm!",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) fetchPlaces();
  }, [user, isAdmin]);

  const handleCreatePlace = async () => {
    setLoading(true);
    if (!newPlace.name || !newPlace.description) {
      toast({
        title: "Lỗi tao địa điểm!",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const placeToCreate: Place = {
          name: newPlace.name,
          description: newPlace.description,
          type: newPlace.type,
          location: {
            latitude,
            longitude,
            address: newPlace.address,
          },
          image: newPlace.image,
          greenTags: newPlace.greenTags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          partnerVouchers: newPlace.voucherName
            ? [
                {
                  name: newPlace.voucherName,
                  description: newPlace.voucherDescription,
                  pointsRequired: newPlace.pointsRequired,
                },
              ]
            : [],
          reviews: [],
        };

        try {
          const created = await createPlace(placeToCreate);
          setLoading(false);
          setPlaces((prev) => [...prev, created]);
          toast({
            title: "Thành công!",
            description: `Địa điểm "${created.name}" đã được tạo.`,
          });
          setNewPlace({
            name: "",
            description: "",
            type: "coffee",
            address: "",
            latitude: 0,
            longitude: 0,
            image: "",
            greenTags: "",
            voucherName: "",
            voucherDescription: "",
            pointsRequired: 0,
          });
          fetchPlaces();
        } catch (error) {
          toast({
            title: "Lỗi khi tạo địa điểm!",
            description: error.message,
            variant: "destructive",
          });
        }
      },
      (error) => {
        toast({
          title: "Không lấy được vị trí!",
          description: error.message,
          variant: "destructive",
        });
      }
    );
  };

  const handleEditPlace = (place) => {
    setEditingPlace({
      _id: place._id,
      name: place.name,
      description: place.description,
      type: place.type,
      address: place.location.address,
      latitude: place.location.latitude,
      longitude: place.location.longitude,
      image: place.image,
      greenTags: place.greenTags.join(", "),
      vouchers: place.partnerVouchers.length
        ? place.partnerVouchers.map((v) => ({
            name: v.name,
            description: v.description,
            pointsRequired: v.pointsRequired,
          }))
        : [
            {
              name: "",
              description: "",
              pointsRequired: 0,
            },
          ],
    });
    setIsEditPlaceDialogOpen(true);
  };

  const handleUpdatePlace = async () => {
    setLoadingUpdate(true);
    if (!editingPlace.name || !editingPlace.description) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const updatedPlaceData: Place = {
          _id: editingPlace._id,
          name: editingPlace.name,
          description: editingPlace.description,
          type: editingPlace.type,
          location: {
            latitude,
            longitude,
            address: editingPlace.address,
          },
          image: editingPlace.image,
          greenTags: editingPlace.greenTags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          partnerVouchers: editingPlace.vouchers.filter(
            (v) => v.name && v.description
          ),
          reviews: [],
        };

        try {
          const updated = await updatePlace(updatedPlaceData, editingPlace._id);
          setLoadingUpdate(false);
          setPlaces((prev) =>
            prev.map((p) => (p._id === editingPlace._id ? updated : p))
          );
          toast({
            title: "Cập nhật thành công!",
            description: `Địa điểm "${updated.name}" đã được cập nhật.`,
          });
          setIsEditPlaceDialogOpen(false);
          setEditingPlace({
            _id: "",
            name: "",
            description: "",
            type: "coffee",
            address: "",
            latitude: 0,
            longitude: 0,
            image: "",
            greenTags: "",
            vouchers: [
              {
                name: "",
                description: "",
                pointsRequired: 0,
              },
            ],
          });
          fetchPlaces();
        } catch (error) {
          toast({
            title: "Lỗi khi cập nhật!",
            description: error.message,
            variant: "destructive",
          });
        }
      },
      (error) => {
        toast({
          title: "Không lấy được vị trí!",
          description: error.message,
          variant: "destructive",
        });
      }
    );
  };

  const handleDeletePlace = async (placeId: string) => {
    const place = places.find((p) => p._id === placeId);
    if (!place) return;
    if (!window.confirm("Bạn có chắc chắn muốn xóa địa điểm này không?"))
      return;
    try {
      await deletePlace(placeId);
      setPlaces((prev) => prev.filter((p) => p._id !== placeId));
      toast({
        title: "Xóa địa điểm thành công!",
        description: `Địa điểm "${place.name}" đã được xóa.`,
      });
      fetchPlaces();
    } catch (error) {
      toast({
        title: "Lỗi khi xóa địa điểm!",
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
      {/* Create New Place */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tạo địa điểm xanh mới
          </CardTitle>
          <CardDescription>Thêm địa điểm thân thiện môi trường</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Tên địa điểm *"
              value={newPlace.name}
              onChange={(e) =>
                setNewPlace({ ...newPlace, name: e.target.value })
              }
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newPlace.type}
              onChange={(e) =>
                setNewPlace({ ...newPlace, type: e.target.value })
              }
            >
              <option value="coffee">Quán cà phê</option>
              <option value="restaurant">Nhà hàng</option>
              <option value="shop">Cửa hàng</option>
              <option value="recycle">Tái chế</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <Textarea
            placeholder="Mô tả địa điểm *"
            value={newPlace.description}
            onChange={(e) =>
              setNewPlace({ ...newPlace, description: e.target.value })
            }
          />
          <Input
            placeholder="Địa chỉ *"
            value={newPlace.address}
            onChange={(e) =>
              setNewPlace({ ...newPlace, address: e.target.value })
            }
          />
          <ImageUploader
            disabled={loading}
            onImageUploaded={(url) => {
              setNewPlace((prev) => ({ ...prev, image: url }));
            }}
          />
          <Input
            placeholder="Tags (cách nhau bởi dấu phẩy)"
            value={newPlace.greenTags}
            onChange={(e) =>
              setNewPlace({ ...newPlace, greenTags: e.target.value })
            }
          />

          {/* Voucher section */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-700 mb-3">
              Voucher đối tác (tùy chọn)
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Tên voucher"
                value={newPlace.voucherName}
                onChange={(e) =>
                  setNewPlace({
                    ...newPlace,
                    voucherName: e.target.value,
                  })
                }
              />
              <Input
                type="number"
                placeholder="Điểm yêu cầu"
                value={newPlace.pointsRequired}
                onChange={(e) =>
                  setNewPlace({
                    ...newPlace,
                    pointsRequired: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <Textarea
              placeholder="Mô tả voucher"
              value={newPlace.voucherDescription}
              onChange={(e) =>
                setNewPlace({
                  ...newPlace,
                  voucherDescription: e.target.value,
                })
              }
              className="mt-2"
            />
          </div>

          <Button
            onClick={handleCreatePlace}
            className="gradient-green text-white"
            disabled={loading}
          >
            {loading ? "Đang tạo địa điểm..." : "Tạo địa điểm"}
          </Button>
        </CardContent>
      </Card>

      {/* Existing Places */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-green-800">
            Danh sách địa điểm đối tác
          </CardTitle>
          <CardDescription>
            Quản lý các địa điểm thân thiện môi trường
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {places.map((place) => (
              <div
                key={place._id}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-green-800">
                      {place.name}
                    </h4>
                    <Badge variant="secondary">
                      {place.type === "coffee"
                        ? "Quán cà phê"
                        : place.type === "recycle"
                        ? "Tái chế"
                        : place.type === "other"
                        ? "Đặc biệt"
                        : place.type === "shop"
                        ? "Cửa hàng"
                        : "Nhà hàng"}
                    </Badge>
                    <Badge
                      variant={
                        place.status === "Hoạt động" ? "default" : "secondary"
                      }
                      className={
                        place.status === "Hoạt động" ? "bg-green-500" : ""
                      }
                    >
                      {place.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {place.description}
                  </p>
                  <div className="text-sm text-gray-600 mb-2">
                    📍 {place.location.address}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {place.greenTags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-green-600"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    {place.partnerVouchers?.length || 0}{" "}
                    {place.partnerVouchers?.length === 1
                      ? "voucher"
                      : "vouchers"}{" "}
                    • {place.reviews?.length || 0} đánh giá
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditPlace(place)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeletePlace(place._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Place Dialog */}
      <Dialog
        open={isEditPlaceDialogOpen}
        onOpenChange={setIsEditPlaceDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-green-800">
              Chỉnh sửa địa điểm xanh
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tên địa điểm *
                </label>
                <Input
                  placeholder="Tên địa điểm"
                  value={editingPlace.name}
                  onChange={(e) =>
                    setEditingPlace({ ...editingPlace, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Loại địa điểm
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={editingPlace.type}
                  onChange={(e) =>
                    setEditingPlace({ ...editingPlace, type: e.target.value })
                  }
                >
                  <option value="coffee">Quán cà phê</option>
                  <option value="restaurant">Nhà hàng</option>
                  <option value="shop">Cửa hàng</option>
                  <option value="recycle">Tái chế</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mô tả *
              </label>
              <Textarea
                placeholder="Mô tả địa điểm"
                value={editingPlace.description}
                onChange={(e) =>
                  setEditingPlace({
                    ...editingPlace,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Địa chỉ *
              </label>
              <Input
                placeholder="Địa chỉ"
                value={editingPlace.address}
                onChange={(e) =>
                  setEditingPlace({
                    ...editingPlace,
                    address: e.target.value,
                  })
                }
              />
            </div>

            <ImageUploader
              disabled={loadingUpdate}
              onImageUploaded={(url) =>
                setEditingPlace((prev) => ({ ...prev, image: url }))
              }
            />

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Thẻ xanh (cách nhau bởi dấu phẩy)
              </label>
              <Input
                placeholder="tái chế, thân thiện môi trường"
                value={editingPlace.greenTags}
                onChange={(e) =>
                  setEditingPlace({
                    ...editingPlace,
                    greenTags: e.target.value,
                  })
                }
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-700 mb-3">
                Voucher đối tác (tùy chọn)
              </h4>
              {editingPlace.vouchers.map((voucher, index) => (
                <div
                  key={index}
                  className="border p-3 rounded-md mb-2 space-y-2"
                >
                  <Input
                    placeholder="Tên voucher"
                    value={voucher.name}
                    onChange={(e) => {
                      const updated = [...editingPlace.vouchers];
                      updated[index].name = e.target.value;
                      setEditingPlace({ ...editingPlace, vouchers: updated });
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Điểm yêu cầu"
                    value={voucher.pointsRequired}
                    onChange={(e) => {
                      const updated = [...editingPlace.vouchers];
                      updated[index].pointsRequired =
                        parseInt(e.target.value) || 0;
                      setEditingPlace({ ...editingPlace, vouchers: updated });
                    }}
                  />
                  <Textarea
                    placeholder="Mô tả voucher"
                    value={voucher.description}
                    onChange={(e) => {
                      const updated = [...editingPlace.vouchers];
                      updated[index].description = e.target.value;
                      setEditingPlace({ ...editingPlace, vouchers: updated });
                    }}
                  />
                  {editingPlace.vouchers.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const updated = [...editingPlace.vouchers];
                        updated.splice(index, 1);
                        setEditingPlace({ ...editingPlace, vouchers: updated });
                      }}
                    >
                      Xóa
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setEditingPlace({
                  ...editingPlace,
                  vouchers: [
                    ...editingPlace.vouchers,
                    { name: "", description: "", pointsRequired: 0 },
                  ],
                })
              }
            >
              + Thêm voucher
            </Button>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditPlaceDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={handleUpdatePlace}
                className="gradient-green text-white"
                disabled={loadingUpdate}
              >
                {loadingUpdate ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
