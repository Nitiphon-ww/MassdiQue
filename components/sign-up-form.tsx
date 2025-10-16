"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm() {
  const [citizenId, setCitizenId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            citizen_id: citizenId,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            birth_date: birthDate,
          },
        ])
        .select();

      if (error) throw error;
      setSuccess("สมัครสมาชิกเรียบร้อยแล้ว!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl text-center">สมัครสมาชิก</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="citizen_id">เลขบัตรประชาชน</Label>
            <Input
              id="citizen_id"
              value={citizenId}
              onChange={(e) => setCitizenId(e.target.value)}
              maxLength={13}
              required
            />
          </div>

          <div>
            <Label htmlFor="first_name">ชื่อ</Label>
            <Input
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="last_name">นามสกุล</Label>
            <Input
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone_number">เบอร์โทรศัพท์</Label>
            <Input
              id="phone_number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength={15}
              required
            />
          </div>

          <div>
            <Label htmlFor="birth_date">วันเดือนปีเกิด</Label>
            <Input
              id="birth_date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
