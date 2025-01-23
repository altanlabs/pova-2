import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function IndexPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [privacy, setPrivacy] = useState({ public: false, friends: false, onlyMe: false });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacy({ ...privacy, [e.target.name]: e.target.checked });
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your TikTok Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" accept="video/*" onChange={handleFileChange} />
          {videoFile && (
            <div className="space-y-2">
              <video controls className="w-full max-w-md">
                <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                Your browser does not support the video tag.
              </video>
              <div className="text-sm text-muted-foreground">
                <p>Name: {videoFile.name}</p>
                <p>Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                <p>Type: {videoFile.type}</p>
              </div>
            </div>
          )}
          <Input
            type="text"
            placeholder="Enter caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className="flex space-x-4">
            <Checkbox
              name="public"
              checked={privacy.public}
              onCheckedChange={handlePrivacyChange}
            />
            <label className="text-sm">Public</label>
            <Checkbox
              name="friends"
              checked={privacy.friends}
              onCheckedChange={handlePrivacyChange}
            />
            <label className="text-sm">Friends</label>
            <Checkbox
              name="onlyMe"
              checked={privacy.onlyMe}
              onCheckedChange={handlePrivacyChange}
            />
            <label className="text-sm">Only Me</label>
          </div>
          <Button variant="default" size="lg">
            Upload Video
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
