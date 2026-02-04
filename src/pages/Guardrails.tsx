import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Shield,
    ShieldCheck,
    ShieldAlert,
    ShieldBan,
    Plus,
    Trash2,
    Edit,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Lock,
    Unlock,
    FileText,
    Code,
    Zap,
    Settings,
    Eye,
    EyeOff,
    Filter,
    Ban,
    AlertOctagon,
    Sparkles,
} from "lucide-react";
import { toast } from "sonner";

// Types
interface BlocklistItem {
    id: string;
    term: string;
    category: string;
    action: 'block' | 'warn' | 'replace';
    replacement?: string;
    enabled: boolean;
}

interface SafetyRule {
    id: string;
    name: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    enabled: boolean;
    category: string;
}

interface AdvancedRule {
    id: string;
    name: string;
    condition: string;
    action: string;
    priority: number;
    enabled: boolean;
}

// Mock data
const mockBlocklist: BlocklistItem[] = [
    { id: '1', term: 'competitor-name', category: 'Brand', action: 'replace', replacement: '[REDACTED]', enabled: true },
    { id: '2', term: 'internal-project-code', category: 'Confidential', action: 'block', enabled: true },
    { id: '3', term: 'profanity-word', category: 'Profanity', action: 'block', enabled: true },
    { id: '4', term: 'sensitive-data-pattern', category: 'PII', action: 'warn', enabled: false },
];

const mockSafetyRules: SafetyRule[] = [
    { id: '1', name: 'Hate Speech Detection', description: 'Block content promoting hate or discrimination', severity: 'critical', enabled: true, category: 'Content' },
    { id: '2', name: 'Violence Prevention', description: 'Prevent generation of violent content', severity: 'critical', enabled: true, category: 'Content' },
    { id: '3', name: 'PII Protection', description: 'Detect and protect personal identifiable information', severity: 'high', enabled: true, category: 'Privacy' },
    { id: '4', name: 'Medical Advice Guard', description: 'Warn when providing medical information', severity: 'medium', enabled: true, category: 'Compliance' },
    { id: '5', name: 'Financial Advice Guard', description: 'Warn when providing financial advice', severity: 'medium', enabled: true, category: 'Compliance' },
    { id: '6', name: 'Self-Harm Prevention', description: 'Block content related to self-harm', severity: 'critical', enabled: true, category: 'Safety' },
];

const mockAdvancedRules: AdvancedRule[] = [
    { id: '1', name: 'Rate Limit Check', condition: 'request.count > 100 per minute', action: 'throttle', priority: 1, enabled: true },
    { id: '2', name: 'Input Length Guard', condition: 'input.length > 4000 chars', action: 'truncate', priority: 2, enabled: true },
    { id: '3', name: 'JSON Injection Prevention', condition: 'input.contains(malicious_json_pattern)', action: 'sanitize', priority: 1, enabled: true },
    { id: '4', name: 'Prompt Injection Detection', condition: 'input.matches(injection_pattern)', action: 'block', priority: 1, enabled: true },
];

const Guardrails = () => {
    const [activeTab, setActiveTab] = useState("prompt-guard");
    const [blocklist, setBlocklist] = useState<BlocklistItem[]>(mockBlocklist);
    const [safetyRules, setSafetyRules] = useState<SafetyRule[]>(mockSafetyRules);
    const [advancedRules, setAdvancedRules] = useState<AdvancedRule[]>(mockAdvancedRules);
    const [isAddBlocklistOpen, setIsAddBlocklistOpen] = useState(false);
    const [newBlockTerm, setNewBlockTerm] = useState("");
    const [newBlockCategory, setNewBlockCategory] = useState("");
    const [newBlockAction, setNewBlockAction] = useState<'block' | 'warn' | 'replace'>('block');
    const [newBlockReplacement, setNewBlockReplacement] = useState("");

    // Prompt Guard Settings
    const [promptInjectionEnabled, setPromptInjectionEnabled] = useState(true);
    const [jailbreakDetection, setJailbreakDetection] = useState(true);
    const [inputValidation, setInputValidation] = useState(true);
    const [outputSanitization, setOutputSanitization] = useState(true);
    const [contextLeakPrevention, setContextLeakPrevention] = useState(true);
    const [systemPromptProtection, setSystemPromptProtection] = useState(true);

    const handleAddBlocklistItem = () => {
        if (!newBlockTerm || !newBlockCategory) {
            toast.error("Please fill in all required fields");
            return;
        }

        const newItem: BlocklistItem = {
            id: Date.now().toString(),
            term: newBlockTerm,
            category: newBlockCategory,
            action: newBlockAction,
            replacement: newBlockAction === 'replace' ? newBlockReplacement : undefined,
            enabled: true,
        };

        setBlocklist([...blocklist, newItem]);
        setNewBlockTerm("");
        setNewBlockCategory("");
        setNewBlockAction('block');
        setNewBlockReplacement("");
        setIsAddBlocklistOpen(false);
        toast.success("Blocklist item added");
    };

    const toggleBlocklistItem = (id: string) => {
        setBlocklist(blocklist.map(item =>
            item.id === id ? { ...item, enabled: !item.enabled } : item
        ));
    };

    const deleteBlocklistItem = (id: string) => {
        setBlocklist(blocklist.filter(item => item.id !== id));
        toast.success("Item removed from blocklist");
    };

    const toggleSafetyRule = (id: string) => {
        setSafetyRules(safetyRules.map(rule =>
            rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
        ));
    };

    const toggleAdvancedRule = (id: string) => {
        setAdvancedRules(advancedRules.map(rule =>
            rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
        ));
    };

    const getSeverityColor = (severity: SafetyRule['severity']) => {
        switch (severity) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-700 border-green-200';
        }
    };

    const getActionBadge = (action: BlocklistItem['action']) => {
        switch (action) {
            case 'block': return <Badge className="bg-red-100 text-red-700">Block</Badge>;
            case 'warn': return <Badge className="bg-yellow-100 text-yellow-700">Warn</Badge>;
            case 'replace': return <Badge className="bg-blue-100 text-blue-700">Replace</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navigation />
            <div className="max-w-[1800px] mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-light text-gray-900 mb-2 flex items-center gap-3">
                                <Shield className="h-8 w-8 text-blue-600" />
                                Guardrails
                            </h1>
                            <p className="text-gray-600 font-light">
                                Configure safety controls and content filtering for your AI agents
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="gap-2">
                                <FileText className="h-4 w-4" />
                                Export Config
                            </Button>
                            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                                <Zap className="h-4 w-4" />
                                Apply Changes
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-green-700">Protection Status</span>
                            </div>
                            <div className="text-2xl font-bold text-green-900">Active</div>
                            <div className="text-xs text-green-600">All guards enabled</div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Ban className="h-5 w-5 text-blue-600" />
                                <span className="text-sm font-medium text-blue-700">Blocked Terms</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-900">{blocklist.filter(b => b.enabled).length}</div>
                            <div className="text-xs text-blue-600">Active blocklist items</div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <ShieldAlert className="h-5 w-5 text-purple-600" />
                                <span className="text-sm font-medium text-purple-700">Safety Rules</span>
                            </div>
                            <div className="text-2xl font-bold text-purple-900">{safetyRules.filter(r => r.enabled).length}/{safetyRules.length}</div>
                            <div className="text-xs text-purple-600">Rules enabled</div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="h-5 w-5 text-orange-600" />
                                <span className="text-sm font-medium text-orange-700">Blocks Today</span>
                            </div>
                            <div className="text-2xl font-bold text-orange-900">47</div>
                            <div className="text-xs text-orange-600">Content violations prevented</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-6">
                        <TabsTrigger value="prompt-guard" className="gap-2">
                            <Lock className="h-4 w-4" />
                            Prompt Guard
                        </TabsTrigger>
                        <TabsTrigger value="blocklist" className="gap-2">
                            <Ban className="h-4 w-4" />
                            Blocklist
                        </TabsTrigger>
                        <TabsTrigger value="safety" className="gap-2">
                            <ShieldAlert className="h-4 w-4" />
                            Safety
                        </TabsTrigger>
                        <TabsTrigger value="rules" className="gap-2">
                            <Code className="h-4 w-4" />
                            Rules (Advanced)
                        </TabsTrigger>
                    </TabsList>

                    {/* Prompt Guard Tab */}
                    <TabsContent value="prompt-guard" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ShieldCheck className="h-5 w-5 text-green-600" />
                                        Input Protection
                                    </CardTitle>
                                    <CardDescription>
                                        Protect against malicious input patterns
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                <AlertOctagon className="h-5 w-5 text-red-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Prompt Injection Detection</h4>
                                                <p className="text-xs text-gray-600 mt-1">Detect and block prompt injection attempts</p>
                                            </div>
                                        </div>
                                        <Switch checked={promptInjectionEnabled} onCheckedChange={setPromptInjectionEnabled} />
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <Unlock className="h-5 w-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Jailbreak Detection</h4>
                                                <p className="text-xs text-gray-600 mt-1">Prevent attempts to bypass safety guidelines</p>
                                            </div>
                                        </div>
                                        <Switch checked={jailbreakDetection} onCheckedChange={setJailbreakDetection} />
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Filter className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Input Validation</h4>
                                                <p className="text-xs text-gray-600 mt-1">Validate and sanitize all user inputs</p>
                                            </div>
                                        </div>
                                        <Switch checked={inputValidation} onCheckedChange={setInputValidation} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Eye className="h-5 w-5 text-purple-600" />
                                        Output Protection
                                    </CardTitle>
                                    <CardDescription>
                                        Control and monitor generated outputs
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <Sparkles className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Output Sanitization</h4>
                                                <p className="text-xs text-gray-600 mt-1">Clean and filter generated content</p>
                                            </div>
                                        </div>
                                        <Switch checked={outputSanitization} onCheckedChange={setOutputSanitization} />
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                                                <EyeOff className="h-5 w-5 text-teal-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Context Leak Prevention</h4>
                                                <p className="text-xs text-gray-600 mt-1">Prevent exposure of system context</p>
                                            </div>
                                        </div>
                                        <Switch checked={contextLeakPrevention} onCheckedChange={setContextLeakPrevention} />
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                <Lock className="h-5 w-5 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">System Prompt Protection</h4>
                                                <p className="text-xs text-gray-600 mt-1">Hide system instructions from outputs</p>
                                            </div>
                                        </div>
                                        <Switch checked={systemPromptProtection} onCheckedChange={setSystemPromptProtection} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Blocklist Tab */}
                    <TabsContent value="blocklist" className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Ban className="h-5 w-5 text-red-600" />
                                            Content Blocklist
                                        </CardTitle>
                                        <CardDescription>
                                            Manage blocked terms, phrases, and patterns
                                        </CardDescription>
                                    </div>
                                    <Dialog open={isAddBlocklistOpen} onOpenChange={setIsAddBlocklistOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="gap-2">
                                                <Plus className="h-4 w-4" />
                                                Add Term
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add Blocklist Item</DialogTitle>
                                                <DialogDescription>
                                                    Add a new term or pattern to the blocklist
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label>Term or Pattern</Label>
                                                    <Input
                                                        value={newBlockTerm}
                                                        onChange={(e) => setNewBlockTerm(e.target.value)}
                                                        placeholder="Enter term, phrase, or regex pattern"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Category</Label>
                                                    <Select value={newBlockCategory} onValueChange={setNewBlockCategory}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Brand">Brand</SelectItem>
                                                            <SelectItem value="Confidential">Confidential</SelectItem>
                                                            <SelectItem value="Profanity">Profanity</SelectItem>
                                                            <SelectItem value="PII">PII</SelectItem>
                                                            <SelectItem value="Custom">Custom</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label>Action</Label>
                                                    <Select value={newBlockAction} onValueChange={(v) => setNewBlockAction(v as any)}>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="block">Block - Reject content entirely</SelectItem>
                                                            <SelectItem value="warn">Warn - Allow with warning</SelectItem>
                                                            <SelectItem value="replace">Replace - Substitute with safe text</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                {newBlockAction === 'replace' && (
                                                    <div>
                                                        <Label>Replacement Text</Label>
                                                        <Input
                                                            value={newBlockReplacement}
                                                            onChange={(e) => setNewBlockReplacement(e.target.value)}
                                                            placeholder="[REDACTED]"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsAddBlocklistOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button onClick={handleAddBlocklistItem}>
                                                    Add to Blocklist
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Term</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Action</TableHead>
                                            <TableHead>Replacement</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {blocklist.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-mono text-sm">{item.term}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{item.category}</Badge>
                                                </TableCell>
                                                <TableCell>{getActionBadge(item.action)}</TableCell>
                                                <TableCell className="text-gray-500">
                                                    {item.replacement || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={item.enabled}
                                                        onCheckedChange={() => toggleBlocklistItem(item.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteBlocklistItem(item.id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Safety Tab */}
                    <TabsContent value="safety" className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldAlert className="h-5 w-5 text-purple-600" />
                                    Safety Rules
                                </CardTitle>
                                <CardDescription>
                                    Configure content safety and compliance rules
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {safetyRules.map((rule) => (
                                        <div
                                            key={rule.id}
                                            className={`p-4 rounded-lg border-2 transition-colors ${rule.enabled ? 'border-gray-200' : 'border-gray-100 opacity-60'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-semibold text-gray-900">{rule.name}</h4>
                                                        <Badge className={`text-xs ${getSeverityColor(rule.severity)}`}>
                                                            {rule.severity}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-gray-600 mb-2">{rule.description}</p>
                                                    <Badge variant="outline" className="text-xs">{rule.category}</Badge>
                                                </div>
                                                <Switch
                                                    checked={rule.enabled}
                                                    onCheckedChange={() => toggleSafetyRule(rule.id)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Advanced Rules Tab */}
                    <TabsContent value="rules" className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Code className="h-5 w-5 text-orange-600" />
                                            Advanced Rules
                                        </CardTitle>
                                        <CardDescription>
                                            Custom rule-based processing with conditions and actions
                                        </CardDescription>
                                    </div>
                                    <Button className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Rule
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Priority</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Condition</TableHead>
                                            <TableHead>Action</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {advancedRules.map((rule) => (
                                            <TableRow key={rule.id}>
                                                <TableCell>
                                                    <Badge variant="outline">{rule.priority}</Badge>
                                                </TableCell>
                                                <TableCell className="font-medium">{rule.name}</TableCell>
                                                <TableCell className="font-mono text-xs text-gray-600 max-w-xs truncate">
                                                    {rule.condition}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className="bg-blue-100 text-blue-700">{rule.action}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={rule.enabled}
                                                        onCheckedChange={() => toggleAdvancedRule(rule.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-1">
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Rule Builder */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-gray-600" />
                                    Rule Builder
                                </CardTitle>
                                <CardDescription>
                                    Create custom rules with conditions and actions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Rule Name</Label>
                                            <Input placeholder="Enter rule name" className="mt-1" />
                                        </div>
                                        <div>
                                            <Label>Condition (Expression)</Label>
                                            <Textarea
                                                placeholder="e.g., input.contains('pattern') && request.count > 10"
                                                className="mt-1 font-mono text-sm h-24"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Action</Label>
                                            <Select>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Select action" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="block">Block Request</SelectItem>
                                                    <SelectItem value="warn">Log Warning</SelectItem>
                                                    <SelectItem value="throttle">Throttle</SelectItem>
                                                    <SelectItem value="sanitize">Sanitize Input</SelectItem>
                                                    <SelectItem value="truncate">Truncate</SelectItem>
                                                    <SelectItem value="redirect">Redirect</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>Priority (1-10)</Label>
                                            <Input type="number" min="1" max="10" placeholder="1" className="mt-1" />
                                        </div>
                                        <Button className="w-full gap-2 mt-4">
                                            <Plus className="h-4 w-4" />
                                            Create Rule
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Guardrails;
