import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

export default function IndexPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [allowComments, setAllowComments] = useState(true);
  const [allowDuet, setAllowDuet] = useState(true);
  const [allowStitch, setAllowStitch] = useState(true);
  const [discloseContent, setDiscloseContent] = useState(false);
  const [brandedContent, setBrandedContent] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<boolean>>) => (checked: boolean | "indeterminate") => {
    setter(checked === true);
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload to TikTok</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
          {videoFile && (
            <div className="w-1/3">
              <video controls className="w-full">
                <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                Your browser does not support the video tag.
              </video>
              <div className="text-sm text-muted-foreground mt-2">
                <p>Filename: {videoFile.name}</p>
                <p>Format: {videoFile.type.split('/')[1].toUpperCase()}</p>
                <p>Resolution: 1080P</p>
                <p>Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
          )}
          <div className="w-2/3 space-y-4">
            <Input type="file" accept="video/*" onChange={handleFileChange} />
            <Input
              type="text"
              placeholder="Add a title that describes your video"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={100}
            />
            <Select value={privacy} onValueChange={setPrivacy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Who can view this video" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="friends">Friends</SelectItem>
                <SelectItem value="onlyMe">Only Me</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex space-x-4">
              <Checkbox
                checked={allowComments}
                onCheckedChange={handleCheckboxChange(setAllowComments)}
              />
              <label className="text-sm">Comment</label>
              <Checkbox
                checked={allowDuet}
                onCheckedChange={handleCheckboxChange(setAllowDuet)}
              />
              <label className="text-sm">Duet</label>
              <Checkbox
                checked={allowStitch}
                onCheckedChange={handleCheckboxChange(setAllowStitch)}
              />
              <label className="text-sm">Stitch</label>
            </div>
            <div className="flex items-center space-x-4">
              <Switch
                checked={discloseContent}
                onCheckedChange={handleCheckboxChange(setDiscloseContent)}
              />
              <label className="text-sm">Disclose video content</label>
            </div>
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={brandedContent}
                onCheckedChange={handleCheckboxChange(setBrandedContent)}
              />
              <label className="text-sm">Branded content</label>
            </div>
            <Button variant="default" size="lg">
              Upload
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
