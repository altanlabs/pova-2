import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { User } from "lucide-react";

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
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-end mb-4">
        <Button variant="default" size="lg" className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-red-500 text-white">
          <User className="h-5 w-5" />
          <span>Connect to TikTok Account</span>
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <CardTitle className="text-3xl font-bold">TikTok API Uploader</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row md:space-x-8 p-6">
          {videoFile && (
            <div className="w-full md:w-1/4">
              <video controls className="w-full rounded-lg shadow-md">
                <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                Your browser does not support the video tag.
              </video>
              <div className="text-sm text-muted-foreground mt-4">
                <p>Filename: {videoFile.name}</p>
                <p>Format: {videoFile.type.split('/')[1].toUpperCase()}</p>
                <p>Resolution: 1080P</p>
                <p>Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
          )}
          <div className="w-full md:w-3/4 space-y-4">
            <div className="flex justify-center">
              <Input type="file" accept="video/*" onChange={handleFileChange} className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center" />
            </div>
            <Input
              type="text"
              placeholder="Add a title that describes your video"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={100}
              className="border border-gray-300 p-2 rounded-lg"
            />
            <Select value={privacy} onValueChange={setPrivacy}>
              <SelectTrigger className="w-full border border-gray-300 rounded-lg">
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
            <Button variant="default" size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              Upload
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
