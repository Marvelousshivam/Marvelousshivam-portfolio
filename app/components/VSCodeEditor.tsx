import React, { useState } from "react";
import {
  File,
  ChevronDown,
  ChevronRight,
  Plus,
  Play,
  Terminal as TerminalIcon,
  Search,
  GitBranch,
  Settings,
  X,
  FileCode,
  FileJson,
  Layout,
  Menu
} from "lucide-react";

interface FileData {
  name: string;
  content: string;
}

interface Project {
  description: string;
  files: FileData[];
}

interface ProjectFiles {
  [key: string]: Project;
}

interface ExpandedState {
  [key: string]: boolean;
}

const VSCodeEditor: React.FC = () => {
  const [projects, setProjects] = useState<ProjectFiles>({
    netphlixx: {
      description: "Custom Movie Streaming Platform",
      files: [
        {
          name: "app.js",
          content: `// Netphlixx - Streaming Platform Core\nconsole.log("Starting Netphlixx services...");\n\nconst movies = [\n  { title: "Supergirl", genre: "Action" },\n  { title: "Silo", genre: "Sci-Fi" }\n];\n\nfunction getTopMovies() {\n  return movies.map(m => m.title).join(", ");\n}\n\nconsole.log("Top 10 Shows Today: " + getTopMovies());\nconsole.log("Ready to stream!");\n`
        },
        {
          name: "scraper.py",
          content: `import time\n\ndef scrape_movies():\n    print("Initializing custom movie scraper...")\n    time.sleep(0.5)\n    print("Extracting direct video links...")\n    print("[SUCCESS] Found 142 new streams.")\n\nscrape_movies()`
        }
      ]
    },
    screenX: {
      description: "Android Screen Recorder",
      files: [
        {
          name: "main.py",
          content: `print("Screen-X Initialized.")\nprint("Current resolution: 1080p")\nprint("FPS limit: 60")\nprint("Status: Recording...")`
        }
      ]
    },
    sandbox: {
      description: "Playground for running code",
      files: [
        {
          name: "hello.py",
          content: `def greet(name):\n    print(f"Hello, {name}! Welcome to my portfolio.")\n\ngreet("Visitor")\n\n# Try changing the code and hitting the Run button (top right)!`
        },
        {
          name: "test.js",
          content: `const a = 10;\nconst b = 20;\nconsole.log(\`The sum of \${a} and \${b} is \${a + b}\`);`
        }
      ]
    }
  });

  const [expandedProjects, setExpandedProjects] = useState<ExpandedState>({
    netphlixx: true,
    screenX: false,
    sandbox: true,
  });

  const [selectedProject, setSelectedProject] = useState<string>("netphlixx");
  const [selectedFile, setSelectedFile] = useState<FileData>(projects.netphlixx.files[0]);
  const [openFiles, setOpenFiles] = useState<FileData[]>([projects.netphlixx.files[0]]);
  
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string>("Welcome to the integrated terminal.\n");
  const [isRunning, setIsRunning] = useState(false);

  const [newFilePrompt, setNewFilePrompt] = useState<{isOpen: boolean, projectName: string}>({isOpen: false, projectName: ""});
  const [newFileName, setNewFileName] = useState("");

  const openNewFilePrompt = (projectName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNewFilePrompt({ isOpen: true, projectName });
    setNewFileName("");
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      const newFile = {
        name: newFileName.trim(),
        content: "// Write your code here...\n",
      };
      setProjects((prev) => ({
        ...prev,
        [newFilePrompt.projectName]: {
          ...prev[newFilePrompt.projectName],
          files: [...prev[newFilePrompt.projectName].files, newFile],
        },
      }));
      openFile(newFilePrompt.projectName, newFile);
      setExpandedProjects(prev => ({ ...prev, [newFilePrompt.projectName]: true }));
    }
    setNewFilePrompt({ isOpen: false, projectName: "" });
    setNewFileName("");
  };

  const openFile = (projectName: string, file: FileData) => {
    setSelectedProject(projectName);
    setSelectedFile(file);
    if (!openFiles.find(f => f.name === file.name)) {
      setOpenFiles([...openFiles, file]);
    }
    setIsMobileSidebarOpen(false);
  };

  const closeFile = (e: React.MouseEvent, fileToClose: FileData) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter(f => f.name !== fileToClose.name);
    setOpenFiles(newOpenFiles);
    if (selectedFile.name === fileToClose.name) {
      setSelectedFile(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : { name: "untitled", content: "" });
    }
  };

  const runCode = async () => {
    if (!selectedFile.name) return;
    setIsTerminalOpen(true);
    setTerminalOutput("Executing code...\n");
    setIsRunning(true);
    
    const ext = selectedFile.name.split('.').pop();
    
    // Fake a small delay for realism
    setTimeout(() => {
      try {
        if (ext === "js") {
          // Intercept console.log for JS execution
          let output = "";
          const originalConsoleLog = console.log;
          console.log = (...args) => {
            output += args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(" ") + "\n";
          };
          
          try {
            const execute = new Function(selectedFile.content);
            execute();
          } catch (execErr: unknown) {
            const errMessage = execErr instanceof Error ? execErr.message : String(execErr);
            output += `Error: ${errMessage}\n`;
          } finally {
            console.log = originalConsoleLog; // Always restore!
          }
          
          setTerminalOutput(`> node ${selectedFile.name}\n\n${output || "[Program finished with no output]"}`);
          
        } else if (ext === "py") {
          // Mock Python execution for simple scripts (since we don't have a backend Python engine)
          let output = "";
          
          // Hardcoded responses for the built-in portfolio scripts for the "wow" factor
          if (selectedFile.content.includes("def scrape_movies():")) {
            output = "Initializing custom movie scraper...\nExtracting direct video links...\n[SUCCESS] Found 142 new streams.\n";
          } else if (selectedFile.content.includes("Screen-X Initialized")) {
            output = "Screen-X Initialized.\nCurrent resolution: 1080p\nFPS limit: 60\nStatus: Recording...\n";
          } else if (selectedFile.content.includes("def greet(")) {
            // Simple regex to catch the greet("...") call
            const callMatch = selectedFile.content.match(/greet\(['"](.*?)['"]\)/);
            if (callMatch) {
              output = `Hello, ${callMatch[1]}! Welcome to my portfolio.\n`;
            } else {
              output = "Hello, Visitor! Welcome to my portfolio.\n";
            }
          } else {
            // Very naive parser for simple print("...") statements
            const lines = selectedFile.content.split('\n');
            let printedSomething = false;
            for (const line of lines) {
              const printMatch = line.match(/print\(['"](.*?)['"]\)/);
              if (printMatch) {
                output += printMatch[1] + "\n";
                printedSomething = true;
              }
            }
            if (!printedSomething) {
               output = "[Simulated Python Execution Complete]\n(Note: Full Python execution requires a backend server in this portfolio environment)\n";
            }
          }
          
          setTerminalOutput(`> python ${selectedFile.name}\n\n${output || "[Program finished with no output]"}`);
          
        } else {
          setTerminalOutput(`Error: Execution for .${ext} files is not supported in this environment.\n`);
        }
      } catch {
        setTerminalOutput("An unexpected error occurred during execution.\n");
      } finally {
        setIsRunning(false);
      }
    }, 600);
  };

  const getFileIcon = (filename: string) => {
    if (filename.endsWith('.js')) return <FileJson size={14} className="text-yellow-400" />;
    if (filename.endsWith('.py')) return <FileCode size={14} className="text-blue-400" />;
    return <File size={14} className="text-gray-400" />;
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-[#cccccc] font-sans overflow-hidden select-none relative">
      
      {/* Top Menu Bar */}
      <div className="flex items-center h-8 bg-[#323233] px-2 md:px-4 text-xs border-b border-[#1e1e1e]">
        <div className="flex items-center md:hidden mr-2">
          <Menu className="text-[#858585] hover:text-white cursor-pointer" size={18} onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        </div>
        <div className="hidden md:flex space-x-4">
          <span className="hover:text-white cursor-pointer">File</span>
          <span className="hover:text-white cursor-pointer">Edit</span>
          <span className="hover:text-white cursor-pointer">Selection</span>
          <span className="hover:text-white cursor-pointer">View</span>
          <span className="hover:text-white cursor-pointer">Go</span>
          <span className="hover:text-white cursor-pointer">Run</span>
          <span className="hover:text-white cursor-pointer">Terminal</span>
        </div>
        <div className="flex-1 flex justify-center text-[#858585] truncate">
          {selectedFile.name} - VS Code
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Activity Bar */}
        <div className="hidden md:flex w-12 shrink-0 bg-[#333333] flex-col items-center py-4 space-y-6">
          <File className="text-white cursor-pointer" size={24} />
          <Search className="text-[#858585] hover:text-white cursor-pointer" size={24} />
          <GitBranch className="text-[#858585] hover:text-white cursor-pointer" size={24} />
          <Layout className="text-[#858585] hover:text-white cursor-pointer" size={24} />
          <div className="flex-1" />
          <Settings className="text-[#858585] hover:text-white cursor-pointer" size={24} />
        </div>

        {/* Sidebar */}
        <div className={`${isMobileSidebarOpen ? 'flex' : 'hidden'} md:flex absolute md:relative z-40 h-full w-64 shrink-0 bg-[#252526] border-r border-[#1e1e1e] flex-col shadow-2xl md:shadow-none`}>
          <div className="px-4 py-2 text-xs font-semibold text-[#bbbbbb] tracking-wider uppercase">
            Explorer
          </div>
          <div className="flex-1 overflow-y-auto">
            {Object.entries(projects).map(([projectName, project]) => (
              <div key={projectName} className="mb-1 text-sm">
                <div 
                  className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-[#2a2d2e] font-bold"
                  onClick={() => setExpandedProjects(prev => ({ ...prev, [projectName]: !prev[projectName] }))}
                >
                  <div className="flex items-center space-x-1">
                    {expandedProjects[projectName] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <span className="uppercase">{projectName}</span>
                  </div>
                  <button onClick={(e) => openNewFilePrompt(projectName, e)} className="hover:bg-[#4d4d4d] p-0.5 rounded">
                    <Plus size={14} />
                  </button>
                </div>

                {expandedProjects[projectName] && (
                  <div className="ml-2">
                    {project.files.map((file) => (
                      <div
                        key={file.name}
                        className={`flex items-center px-4 py-1 cursor-pointer hover:bg-[#2a2d2e] ${selectedFile.name === file.name ? "bg-[#37373d] text-white" : "text-[#cccccc]"}`}
                        onClick={() => openFile(projectName, file)}
                      >
                        {getFileIcon(file.name)}
                        <span className="ml-2">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Editor Pane */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-0">
          
          {/* Editor Tabs */}
          <div className="flex bg-[#252526] overflow-x-auto hide-scrollbar">
            {openFiles.map(file => (
              <div 
                key={file.name} 
                className={`flex items-center space-x-2 px-3 py-2 min-w-[120px] max-w-[200px] cursor-pointer border-r border-[#1e1e1e] ${selectedFile.name === file.name ? "bg-[#1e1e1e] border-t-2 border-t-[#007acc] text-white" : "bg-[#2d2d2d] text-[#858585] hover:bg-[#1e1e1e]"}`}
                onClick={() => setSelectedFile(file)}
              >
                {getFileIcon(file.name)}
                <span className="truncate flex-1 text-sm">{file.name}</span>
                <button onClick={(e) => closeFile(e, file)} className="opacity-0 hover:bg-[#4d4d4d] p-0.5 rounded transition-opacity hover:opacity-100 group-hover:opacity-100">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Breadcrumbs & Actions */}
          <div className="flex items-center justify-between px-4 py-1 text-xs text-[#858585] shadow-sm">
            <div className="flex items-center space-x-1">
              <span>{selectedProject}</span>
              <ChevronRight size={12} />
              <span>{selectedFile.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center space-x-1 hover:text-white transition-colors disabled:opacity-50"
                title="Run Code (Play)"
              >
                <Play size={14} className={isRunning ? "text-gray-500" : "text-green-500"} />
              </button>
              <button onClick={() => setIsTerminalOpen(!isTerminalOpen)} className="hover:text-white">
                <TerminalIcon size={14} />
              </button>
            </div>
          </div>

          {/* Code Textarea */}
          <div className="flex-1 flex overflow-hidden relative">
            <div className="w-12 text-right pr-4 py-2 font-mono text-sm text-[#858585] select-none border-r border-[#333333]">
              {selectedFile.content.split("\n").map((_, i) => (
                <div key={i} className="leading-6">{i + 1}</div>
              ))}
            </div>
            <textarea
              value={selectedFile.content}
              onChange={(e) => {
                const updatedFile = { ...selectedFile, content: e.target.value };
                setProjects((prev) => ({
                  ...prev,
                  [selectedProject]: {
                    ...prev[selectedProject],
                    files: prev[selectedProject].files.map((f) =>
                      f.name === selectedFile.name ? updatedFile : f
                    ),
                  },
                }));
                setSelectedFile(updatedFile);
                setOpenFiles(prev => prev.map(f => f.name === selectedFile.name ? updatedFile : f));
              }}
              className="flex-1 w-full h-full p-2 bg-transparent text-[#d4d4d4] font-mono text-sm resize-none outline-none leading-6 whitespace-pre"
              spellCheck="false"
              style={{ tabSize: 4 }}
            />
          </div>

          {/* Terminal Pane */}
          {isTerminalOpen && (
            <div className="h-48 border-t border-[#333333] flex flex-col bg-[#1e1e1e]">
              <div className="flex items-center justify-between px-4 py-1 text-xs text-[#858585] uppercase tracking-wider border-b border-[#333333]">
                <div className="flex space-x-4">
                  <span className="hover:text-white cursor-pointer">Problems</span>
                  <span className="hover:text-white cursor-pointer">Output</span>
                  <span className="text-white border-b border-[#007acc] pb-1">Terminal</span>
                </div>
                <button onClick={() => setIsTerminalOpen(false)} className="hover:text-white p-1">
                  <X size={14} />
                </button>
              </div>
              <div className="flex-1 p-2 font-mono text-xs overflow-y-auto whitespace-pre-wrap text-[#cccccc]">
                {terminalOutput}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center px-3 text-xs justify-between select-none">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 cursor-pointer hover:bg-white/20 px-1 rounded">
            <GitBranch size={12} />
            <span>main*</span>
          </div>
          <div className="cursor-pointer hover:bg-white/20 px-1 rounded">
            0A 0W
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded">Ln 1, Col 1</span>
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded">Spaces: 4</span>
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded">UTF-8</span>
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded">{selectedFile.name.split('.').pop()?.toUpperCase() || "Plain Text"}</span>
        </div>
      </div>

      {/* VS Code Command Palette / Modal style for new file */}
      {newFilePrompt.isOpen && (
        <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#252526] border border-[#454545] rounded-md shadow-2xl w-[400px] overflow-hidden flex flex-col">
            <div className="p-3 border-b border-[#454545]">
              <input
                autoFocus
                type="text"
                placeholder="Enter file name (e.g., script.py or main.js)"
                className="w-full bg-[#3c3c3c] text-[#cccccc] border border-[#007acc] rounded px-3 py-1.5 text-sm outline-none placeholder-gray-500"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateFile();
                  if (e.key === 'Escape') setNewFilePrompt({ isOpen: false, projectName: "" });
                }}
              />
            </div>
            <div className="px-3 py-2 text-xs text-[#858585] flex justify-between items-center bg-[#1e1e1e]">
              <span>Press <strong className="text-[#cccccc]">Enter</strong> to create</span>
              <span>Press <strong className="text-[#cccccc]">Esc</strong> to cancel</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default VSCodeEditor;
