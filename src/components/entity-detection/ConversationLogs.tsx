
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search, Filter, Calendar } from "lucide-react";
import { getConversationLogs } from "@/services/conversationLogService";

interface ConversationLog {
  id: string;
  user_input: string;
  detected_entities: any[];
  missing_entities?: any[];
  confidence_scores?: any;
  language: string;
  processed: boolean;
  created_at: string;
}

const ConversationLogs = () => {
  const [logs, setLogs] = useState<ConversationLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ConversationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [processedFilter, setProcessedFilter] = useState("all");

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, languageFilter, processedFilter]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const result = await getConversationLogs();
      if (result.data) {
        setLogs(result.data);
      }
    } catch (error) {
      console.error('Error loading conversation logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLogs = () => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.user_input.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (languageFilter !== "all") {
      filtered = filtered.filter(log => log.language === languageFilter);
    }

    if (processedFilter !== "all") {
      filtered = filtered.filter(log => 
        processedFilter === "processed" ? log.processed : !log.processed
      );
    }

    setFilteredLogs(filtered);
  };

  const getUniqueLanguages = () => {
    return [...new Set(logs.map(log => log.language))];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conversation Logs</CardTitle>
          <CardDescription>Loading conversation history...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Conversation Logs</h2>
        <p className="text-gray-600">History of entity detection conversations</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {getUniqueLanguages().map(lang => (
                    <SelectItem key={lang} value={lang}>
                      {lang.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={processedFilter} onValueChange={setProcessedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="unprocessed">Unprocessed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation History</CardTitle>
          <CardDescription>
            {filteredLogs.length} of {logs.length} conversations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No conversation logs found</p>
              <p className="text-sm">
                {logs.length === 0 
                  ? "Start detecting entities to see conversation logs"
                  : "Try adjusting your filters"
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLogs.map(log => (
                <div key={log.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{log.language.toUpperCase()}</Badge>
                      <Badge 
                        variant={log.processed ? "default" : "secondary"}
                        className={log.processed ? "bg-green-100 text-green-800" : ""}
                      >
                        {log.processed ? "Processed" : "Pending"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {formatDate(log.created_at)}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-medium mb-2">User Input:</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded border">
                      "{log.user_input}"
                    </p>
                  </div>

                  {log.detected_entities && log.detected_entities.length > 0 && (
                    <div className="mb-3">
                      <h4 className="font-medium mb-2">Detected Entities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {log.detected_entities.map((entity, index) => (
                          <Badge key={index} variant="secondary">
                            {entity.type}: {entity.value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {log.missing_entities && log.missing_entities.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-amber-700">Missing Entities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {log.missing_entities.map((entity, index) => (
                          <Badge key={index} variant="outline" className="border-amber-300 text-amber-700">
                            {entity.type}: {entity.value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationLogs;
