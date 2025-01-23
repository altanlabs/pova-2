import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function IndexPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [privacy, setPrivacy] = useState("public");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your TikTok Video</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
          {videoFile && (
            <div className="w-1/3">
              <video controls className="w-full">
                <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                Your browser does not support the video tag.
              </video>
              <div className="text-sm text-muted-foreground mt-2">
                <p>Name: {videoFile.name}</p>
                <p>Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                <p>Type: {videoFile.type}</p>
              </div>
            </div>
          )}
          <div className="w-2/3 space-y-4">
            <Input type="file" accept="video/*" onChange={handleFileChange} />
            <Input
              type="text"
              placeholder="Enter caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Select value={privacy} onValueChange={setPrivacy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select privacy setting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="friends">Friends</SelectItem>
                <SelectItem value="onlyMe">Only Me</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="default" size="lg">
              Upload Video
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
