import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Download, Copy, Eye, BookOpen, Users, Lightbulb } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Converter = () => {
  const { toast } = useToast();
  const [textInput, setTextInput] = useState('');
  const [brailleOutput, setBrailleOutput] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBrailleOutput, setPdfBrailleOutput] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  // Simple text to Braille converter (mock implementation)
  const convertTextToBraille = (text: string): string => {
    // This is a simplified mapping - in production, use a proper Braille library
    const brailleMap: Record<string, string> = {
      'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
      'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
      'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
      'y': '⠽', 'z': '⠵', ' ': ' ', '.': '⠲', ',': '⠂', '!': '⠖', '?': '⠦',
    };
    
    return text.toLowerCase().split('').map(char => brailleMap[char] || char).join('');
  };

  const handleTextConvert = () => {
    if (!textInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to convert",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);
    setShowOutput(false);
    
    setTimeout(() => {
      const braille = convertTextToBraille(textInput);
      setBrailleOutput(braille);
      setShowOutput(true);
      setIsConverting(false);
      
      toast({
        title: "Success",
        description: "Text converted to Braille successfully!"
      });
    }, 1000);
  };

  const handlePdfConvert = () => {
    if (!pdfFile) {
      toast({
        title: "Error",
        description: "Please upload a PDF file first",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);
    setShowOutput(false);
    
    setTimeout(() => {
      const mockText = "This is a sample conversion from your PDF. In production, this would extract actual text from the PDF file.";
      const braille = convertTextToBraille(mockText);
      setPdfBrailleOutput(braille);
      setShowOutput(true);
      setIsConverting(false);
      
      toast({
        title: "Success",
        description: "PDF converted to Braille successfully!"
      });
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} is ready for conversion`
      });
    } else {
      toast({
        title: "Error",
        description: "Please upload a valid PDF file",
        variant: "destructive"
      });
    }
  };

  const handleTextFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTextInput(event.target?.result as string);
      };
      reader.readAsText(file);
      toast({
        title: "File Loaded",
        description: `${file.name} loaded successfully`
      });
    } else {
      toast({
        title: "Error",
        description: "Please upload a valid text file",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Braille text copied to clipboard"
    });
  };

  const downloadBraille = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: `${filename} downloaded successfully`
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'url(/placeholder.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background z-0" />
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Convert Text & PDFs into Braille
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether it's notes, documents, or full books — instantly transform them into Braille for learning and accessibility.
          </p>
        </div>
      </section>

      {/* Converter Tabs */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="text" className="text-base">
              <FileText className="w-4 h-4 mr-2" />
              Text to Braille
            </TabsTrigger>
            <TabsTrigger value="pdf" className="text-base">
              <Upload className="w-4 h-4 mr-2" />
              PDF to Braille
            </TabsTrigger>
          </TabsList>

          {/* Text to Braille Tab */}
          <TabsContent value="text" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Text Input</CardTitle>
                <CardDescription>Paste your text or upload a .txt file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste or type your text here…"
                  className="min-h-[200px] text-base"
                />
                
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="relative" asChild>
                    <label>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload .txt File
                      <input
                        type="file"
                        accept=".txt"
                        className="hidden"
                        onChange={handleTextFileUpload}
                      />
                    </label>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={handleTextConvert}
                    disabled={isConverting}
                    className="flex-1 sm:flex-none"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isConverting ? 'Converting...' : 'Convert to Braille'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => downloadBraille(brailleOutput, 'braille-output.txt')}
                    disabled={!brailleOutput}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download .txt
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => downloadBraille(brailleOutput, 'braille-output.brf')}
                    disabled={!brailleOutput}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download .brf
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showOutput && brailleOutput && (
              <Card className="border-2 animate-fade-in">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Braille Output</CardTitle>
                      <CardDescription>Your converted Braille text</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(brailleOutput)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-lg font-mono text-2xl leading-relaxed break-all animate-fade-in">
                    {brailleOutput}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PDF to Braille Tab */}
          <TabsContent value="pdf" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>PDF Upload</CardTitle>
                <CardDescription>Upload a PDF file to convert to Braille</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
                  onClick={() => document.getElementById('pdf-upload')?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-2">
                    {pdfFile ? pdfFile.name : 'Drag & drop your PDF here'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {pdfFile ? `Size: ${(pdfFile.size / 1024).toFixed(2)} KB` : 'or click to browse'}
                  </p>
                  <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>

                {pdfFile && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPdfFile(null)}
                    >
                      Remove File
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <label>
                        Replace File
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </Button>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={handlePdfConvert}
                    disabled={isConverting || !pdfFile}
                    className="flex-1 sm:flex-none"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isConverting ? 'Converting...' : 'Convert to Braille'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => downloadBraille(pdfBrailleOutput, 'pdf-braille-output.txt')}
                    disabled={!pdfBrailleOutput}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download .txt
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => downloadBraille(pdfBrailleOutput, 'pdf-braille-output.brf')}
                    disabled={!pdfBrailleOutput}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download .brf
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => downloadBraille(pdfBrailleOutput, 'braille-overlay.pdf')}
                    disabled={!pdfBrailleOutput}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF with Braille
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showOutput && pdfBrailleOutput && (
              <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>PDF Preview</CardTitle>
                    <CardDescription>First page of your document</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[8.5/11] bg-muted rounded-lg flex items-center justify-center">
                      <FileText className="w-24 h-24 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Braille Output</CardTitle>
                        <CardDescription>Converted Braille text</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(pdfBrailleOutput)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted rounded-lg font-mono text-xl leading-relaxed break-all max-h-[400px] overflow-y-auto">
                      {pdfBrailleOutput}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Why This Matters Section */}
      <section className="container mx-auto px-4 py-16 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why This Matters</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Empowering accessibility through technology
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Inclusive Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Blind students can access study material faster, enabling equal educational opportunities and independence.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>NGO Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Easy Braille conversion for large-scale distribution, helping organizations reach more communities effectively.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Future Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Supports education, careers, and independence — building a more accessible future for everyone.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Converter;
