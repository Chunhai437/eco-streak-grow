
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Circle, Trophy, Gift } from 'lucide-react';

const Habits = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [habits] = useState([
    {
      id: 1,
      name: "Mang túi vải khi đi mua sắm",
      description: "Giảm sử dụng túi nilon",
      category: "Mua sắm xanh",
      points: 10
    },
    {
      id: 2,
      name: "Tắt điện khi ra khỏi phòng",
      description: "Tiết kiệm năng lượng",
      category: "Tiết kiệm điện",
      points: 5
    },
    {
      id: 3,
      name: "Sử dụng chai nước cá nhân",
      description: "Giảm rác thải nhựa",
      category: "Giảm rác thải",
      points: 15
    }
  ]);

  const [challenges] = useState([
    {
      id: 1,
      name: "15 ngày mang chai nước",
      habitId: 3,
      startDate: "2024-01-01",
      endDate: "2024-01-15",
      currentStreak: 8,
      totalDays: 15,
      completed: false,
      type: "plant", // plant or puzzle
      rewards: {
        dailyPoints: 15,
        completionBonus: 100,
        voucher: "Giảm 20% tại Green Cafe"
      }
    },
    {
      id: 2,
      name: "30 ngày tiết kiệm điện",
      habitId: 2,
      startDate: "2024-01-01",
      endDate: "2024-01-30",
      currentStreak: 12,
      totalDays: 30,
      completed: false,
      type: "puzzle",
      rewards: {
        dailyPoints: 5,
        completionBonus: 150,
        voucher: "Voucher 50k tại siêu thị xanh"
      }
    }
  ]);

  const [dailyChecks, setDailyChecks] = useState<Record<number, boolean>>({});

  const handleDailyCheck = (challengeId: number) => {
    setDailyChecks(prev => ({
      ...prev,
      [challengeId]: !prev[challengeId]
    }));

    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !dailyChecks[challengeId]) {
      toast({
        title: "Tuyệt vời! 🎉",
        description: `Bạn đã nhận ${challenge.rewards.dailyPoints} điểm!`,
      });
    }
  };

  const renderPlantProgress = (streak: number, total: number) => {
    const stages = [
      { stage: 0, emoji: "🌱", name: "Mầm cây" },
      { stage: Math.floor(total * 0.3), emoji: "🌿", name: "Lá non" },
      { stage: Math.floor(total * 0.6), emoji: "🌳", name: "Cây nhỏ" },
      { stage: total, emoji: "🌸", name: "Hoa đăl" }
    ];

    const currentStage = stages.reduce((prev, curr) => 
      streak >= curr.stage ? curr : prev
    );

    return (
      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
        <div className="text-6xl mb-4">{currentStage.emoji}</div>
        <div className="text-lg font-semibold text-green-700">{currentStage.name}</div>
        <div className="text-sm text-gray-600 mt-2">
          {streak}/{total} ngày - Tiếp tục chăm sóc cây của bạn! 🌱
        </div>
      </div>
    );
  };

  const renderPuzzleProgress = (streak: number, total: number) => {
    const completedPieces = streak;
    const totalPieces = total;
    
    return (
      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
        <div className="grid grid-cols-6 gap-1 max-w-48 mx-auto mb-4">
          {Array.from({ length: totalPieces }).map((_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-sm border-2 ${
                index < completedPieces 
                  ? 'bg-gradient-to-br from-purple-400 to-pink-400 border-purple-300' 
                  : 'bg-gray-100 border-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-lg font-semibold text-purple-700">
          {completedPieces}/{totalPieces} mảnh ghép
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Hoàn thành puzzle để nhận voucher! 🧩
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Vui lòng đăng nhập để xem thói quen
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thói quen xanh</h1>
          <p className="text-gray-600">Theo dõi và phát triển lối sống bền vững</p>
        </div>

        <Tabs defaultValue="challenges" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="challenges">Thử thách của tôi</TabsTrigger>
            <TabsTrigger value="habits">Thói quen gốc</TabsTrigger>
            <TabsTrigger value="progress">Tiến độ</TabsTrigger>
          </TabsList>

          <TabsContent value="challenges" className="space-y-6 mt-6">
            <div className="grid gap-6">
              {challenges.map((challenge) => {
                const habit = habits.find(h => h.id === challenge.habitId);
                const progress = (challenge.currentStreak / challenge.totalDays) * 100;
                const isCheckedToday = dailyChecks[challenge.id];

                return (
                  <Card key={challenge.id} className="glass-effect">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-green-800 flex items-center gap-2">
                            <Trophy className="w-5 h-5" />
                            {challenge.name}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {habit?.description} • {challenge.rewards.dailyPoints} điểm/ngày
                          </CardDescription>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary">{habit?.category}</Badge>
                            <Badge variant="outline" className="text-green-600">
                              {challenge.currentStreak}/{challenge.totalDays} ngày
                            </Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleDailyCheck(challenge.id)}
                          variant={isCheckedToday ? "default" : "outline"}
                          className={isCheckedToday ? "gradient-green text-white" : ""}
                        >
                          {isCheckedToday ? (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          ) : (
                            <Circle className="w-4 h-4 mr-2" />
                          )}
                          {isCheckedToday ? "Đã hoàn thành" : "Hoàn thành"}
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Tiến độ</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {/* Gamification Display */}
                      {challenge.type === "plant" 
                        ? renderPlantProgress(challenge.currentStreak, challenge.totalDays)
                        : renderPuzzleProgress(challenge.currentStreak, challenge.totalDays)
                      }

                      <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 text-yellow-800 font-semibold mb-2">
                          <Gift className="w-4 h-4" />
                          Phần thưởng
                        </div>
                        <div className="text-sm text-yellow-700">
                          <div>• Hoàn thành: +{challenge.rewards.completionBonus} điểm</div>
                          <div>• Voucher: {challenge.rewards.voucher}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="habits" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {habits.map((habit) => (
                <Card key={habit.id} className="glass-effect hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-800">{habit.name}</CardTitle>
                    <CardDescription>{habit.description}</CardDescription>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">{habit.category}</Badge>
                      <Badge variant="outline" className="text-green-600">
                        {habit.points} điểm
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full gradient-green text-white"
                      onClick={() => {
                        toast({
                          title: "Tạo thử thách thành công!",
                          description: `Bạn đã tạo thử thách từ thói quen "${habit.name}"`,
                        });
                      }}
                    >
                      Tạo thử thách
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass-effect">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">127</div>
                  <div className="text-gray-600">Tổng điểm</div>
                </CardContent>
              </Card>
              
              <Card className="glass-effect">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                  <div className="text-gray-600">Thử thách hoàn thành</div>
                </CardContent>
              </Card>
              
              <Card className="glass-effect">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">20</div>
                  <div className="text-gray-600">Streak dài nhất</div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800">Lịch sử hoạt động</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Hôm nay", action: "Hoàn thành: Mang chai nước", points: 15 },
                    { date: "Hôm qua", action: "Hoàn thành: Tắt điện", points: 5 },
                    { date: "2 ngày trước", action: "Hoàn thành: Mang túi vải", points: 10 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{item.action}</div>
                        <div className="text-sm text-gray-600">{item.date}</div>
                      </div>
                      <div className="text-green-600 font-semibold">+{item.points}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Habits;
