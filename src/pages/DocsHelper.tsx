import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Search,
  Code,
  HelpCircle,
  ExternalLink,
  Sparkles,
  ThumbsUp,
  Tag as TagIcon,
  Rocket,
  Target,
  Zap,
  Settings,
  Link,
  FileCode,
} from "lucide-react";
import {
  getDocCategories,
  searchDocs,
  getAllDocSections,
  getDocById,
  getCodeExamples,
  getFAQs,
  getQuickLinks,
  getPopularArticles,
  type DocCategory,
  type SearchResult,
  type DocSection,
  type CodeExample,
  type FAQ,
} from "@/services/docsHelperService";

const DocsHelper = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocSection | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getDocCategories();
  const codeExamples = getCodeExamples();
  const faqs = getFAQs();
  const quickLinks = getQuickLinks();
  const popularArticles = getPopularArticles();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = searchDocs(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectDoc = (docId: string) => {
    const doc = getDocById(docId);
    if (doc) {
      setSelectedDoc(doc);
      setSearchResults([]);
      setSearchQuery("");
      setSelectedCategory(null);
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedDoc(null);
    setSearchResults([]);
  };

  const getDifficultyColor = (difficulty: DocSection['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
    }
  };

  const categoryDocs = selectedCategory
    ? getAllDocSections().filter(doc => doc.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            Documentation Helper
          </h1>
          <p className="text-gray-600 font-light">
            Interactive documentation assistant for Dialogflow development
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardContent className="p-8">
            <div className="flex gap-3">
              <Input
                placeholder="Search documentation... (e.g., 'how to create intents', 'webhook setup')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 text-lg bg-white text-gray-900"
              />
              <Button
                onClick={handleSearch}
                size="lg"
                variant="secondary"
                className="gap-2 px-8"
              >
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
            {searchResults.length > 0 && (
              <div className="mt-4 p-4 bg-white rounded-lg text-gray-900 max-h-96 overflow-auto">
                <p className="font-semibold mb-3">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </p>
                <div className="space-y-2">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => handleSelectDoc(result.id)}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-600">{result.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{result.excerpt}</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {result.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500 ml-4">
                          Score: {result.relevanceScore}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Categories & Quick Links */}
          <div className="space-y-6">
            {/* Categories */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleSelectCategory(category.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedCategory === category.id
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl">{category.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{category.name}</h4>
                          <p className={`text-xs ${
                            selectedCategory === category.id ? 'text-blue-100' : 'text-gray-600'
                          }`}>
                            {category.articleCount} articles
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5 text-blue-600" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600">
                            {link.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">{link.description}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="code">Code Examples</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                {selectedDoc ? (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{selectedDoc.title}</CardTitle>
                          <div className="flex gap-2 flex-wrap">
                            <Badge className={getDifficultyColor(selectedDoc.difficulty)}>
                              {selectedDoc.difficulty}
                            </Badge>
                            <Badge variant="outline">{selectedDoc.category}</Badge>
                            {selectedDoc.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                <TagIcon className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                          {selectedDoc.content}
                        </div>
                      </div>

                      {selectedDoc.relatedTopics.length > 0 && (
                        <>
                          <Separator className="my-6" />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Related Topics</h3>
                            <div className="flex gap-2 flex-wrap">
                              {selectedDoc.relatedTopics.map((topic) => (
                                <Badge key={topic} variant="outline" className="cursor-pointer hover:bg-gray-100">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      <Separator className="my-6" />
                      <div className="text-xs text-gray-500">
                        Last updated: {new Date(selectedDoc.lastUpdated).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ) : selectedCategory ? (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>
                        {categories.find(c => c.id === selectedCategory)?.name || 'Category'}
                      </CardTitle>
                      <CardDescription>
                        {categoryDocs.length} article{categoryDocs.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {categoryDocs.map((doc) => (
                          <div
                            key={doc.id}
                            onClick={() => handleSelectDoc(doc.id)}
                            className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
                                {doc.title}
                              </h4>
                              <Badge className={getDifficultyColor(doc.difficulty)}>
                                {doc.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {doc.content.substring(0, 150)}...
                            </p>
                            <div className="flex gap-2 mt-3">
                              {doc.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Rocket className="h-6 w-6 text-blue-600" />
                        Welcome to Dialogflow Documentation
                      </CardTitle>
                      <CardDescription>
                        Everything you need to build powerful conversational experiences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <p className="text-gray-700">
                          Browse documentation by category on the left, search for specific topics,
                          or explore our code examples and FAQs.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {categories.slice(0, 6).map((category) => (
                            <div
                              key={category.id}
                              onClick={() => handleSelectCategory(category.id)}
                              className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg cursor-pointer hover:shadow-md transition-all group"
                            >
                              <div className="text-4xl mb-3">{category.icon}</div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                                {category.name}
                              </h3>
                              <p className="text-sm text-gray-600">{category.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <div className="grid gap-6">
                  {codeExamples.map((example) => (
                    <Card key={example.id} className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <FileCode className="h-5 w-5 text-green-600" />
                              {example.title}
                            </CardTitle>
                            <CardDescription>{example.description}</CardDescription>
                          </div>
                          <Badge variant="outline">{example.language}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm">
                          <code>{example.code}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="faq" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-6 w-6 text-orange-600" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>
                      Common questions and answers from the community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-start gap-3">
                              <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span className="font-medium">{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-8 space-y-3">
                              <p className="text-gray-700">{faq.answer}</p>
                              <div className="flex items-center justify-between">
                                <Badge variant="outline">{faq.category}</Badge>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <ThumbsUp className="h-4 w-4" />
                                  {faq.helpful} found helpful
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="popular" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-6 w-6 text-yellow-600" />
                      Popular Articles
                    </CardTitle>
                    <CardDescription>
                      Most viewed documentation this week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {popularArticles.map((article, index) => (
                        <div
                          key={article.id}
                          onClick={() => handleSelectDoc(article.id)}
                          className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                                {article.title}
                              </h4>
                              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                {article.content.substring(0, 120)}...
                              </p>
                              <div className="flex gap-2">
                                <Badge className={getDifficultyColor(article.difficulty)}>
                                  {article.difficulty}
                                </Badge>
                                <Badge variant="outline">{article.category}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsHelper;
