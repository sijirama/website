"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Home, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Directory, File as FileType, TreeItem } from "@/lib/library";
import { setItemForPath } from "@/store/pathStorage";
import { useInterface } from "@/store/InterfaceStore";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { rubik } from "@/lib/fonts";

const rf = rubik.className;

function FileItem({ file }: { file: FileType }) {
  const pathname = usePathname();
  const isActive = pathname?.includes(file.fullPath);

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild isActive={isActive} size="sm">
        <Link href={`/library/${file.fullPath}`} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
          <span className="size-3 shrink-0 flex items-center justify-center">
            <span className="size-1.5 rounded-full bg-zinc-300 block" />
          </span>
          <span className={`${rf} truncate text-[12px]`}>{file.path.replace(".md", "")}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

function FolderItem({ folder, depth = 0 }: { folder: Directory; depth?: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const files = folder.files.filter(f => f.type === "blob") as FileType[];
  const subfolders = folder.files.filter(f => f.type === "tree") as Directory[];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 rounded-md">
            <span className="size-3.5 shrink-0 flex items-center justify-center">
              <span className="w-2 h-2 rounded-[2px] bg-zinc-400 block" />
            </span>
            <span className={`${rf} font-medium text-[13px] truncate`}>{folder.path}</span>
            <ChevronDown className="ml-auto size-3.5 text-zinc-300 transition-transform shrink-0 group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="border-l border-zinc-150 ml-2 pl-1">
            {files.map((file) => (
              <FileItem key={file.fullPath} file={file} />
            ))}
            {subfolders.map((subfolder) => (
              <FolderItem key={subfolder.fullPath} folder={subfolder} depth={depth + 1} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function SidebarSkeleton({ isCollapsed }: { isCollapsed: boolean }) {
  if (isCollapsed) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <SidebarMenuItem key={i}>
            <div className="flex items-center justify-center py-1.5 mx-1">
              <div className="size-2 rounded-none bg-zinc-200 animate-pulse" />
            </div>
          </SidebarMenuItem>
        ))}
      </>
    );
  }

  return (
    <>
      {Array.from({ length: 5 }).map((_, folderIdx) => (
        <SidebarMenuItem key={folderIdx}>
          <div className="flex items-center gap-2 px-2 py-1.5 mx-1 rounded-md">
            <div className="w-2 h-2 rounded-none bg-zinc-200 animate-pulse shrink-0" />
            <div className="h-3 rounded bg-zinc-200 animate-pulse flex-1" style={{ width: `${50 + (folderIdx * 13) % 35}%` }} />
            <div className="size-3.5 rounded bg-zinc-200 animate-pulse shrink-0" />
          </div>
          <div className="ml-4 border-l border-zinc-100 pl-2 mb-1">
            {Array.from({ length: 3 }).map((_, fileIdx) => (
              <div key={fileIdx} className="flex items-center gap-2 px-2 py-1 my-0.5">
                <div className="size-1.5 rounded-full bg-zinc-100 animate-pulse shrink-0" />
                <div className="h-2.5 rounded bg-zinc-100 animate-pulse" style={{ width: `${45 + (fileIdx * 17 + folderIdx * 11) % 40}%` }} />
              </div>
            ))}
          </div>
        </SidebarMenuItem>
      ))}
    </>
  );
}

export function ExplorerSidebar() {
  const [tree, setTree] = useState<TreeItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { onClose } = useInterface();
  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/explorer");
        setTree(response.data.directory);
      } catch (error) {
        console.error("Failed to fetch explorer data:", error);
        setTree(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleClick = (path: string) => {
    setItemForPath(path);
    router.push(`/library/${path}`);
    onClose();
  };

  const isHomeActive = pathname === "/library/Home.md";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-zinc-100 p-0 overflow-hidden">
        {!isCollapsed && (
          <div>
            <div className="w-full h-32 overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/40/46/27/404627e9adabdd941edf659e358405a7.jpg"
                alt="Cover"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="px-4 py-3 flex items-start justify-between">
              <div>
                <h2 className={`${rf} font-semibold text-zinc-900 text-sm`}>oluwasijibomi</h2>
                <p className={`${rf} text-[11px] text-zinc-400 mt-0.5`}>Digital Garden</p>
              </div>
              <Link href="/" className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors" title="Back to home">
                <X className="size-4" />
              </Link>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="p-2">
            <Link href="/" className="flex items-center justify-center size-8 rounded-md overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/40/46/27/404627e9adabdd941edf659e358405a7.jpg"
                alt="Cover"
                className="w-full h-full object-cover object-center"
              />
            </Link>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="p-0">
        <SidebarGroup className="px-2 py-2">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isHomeActive} tooltip="Home" className="hover:bg-zinc-100 rounded-md text-zinc-600 hover:text-zinc-900">
                  <Link href="/library/Home.md" className="flex items-center gap-2">
                    <Home className="size-3.5 shrink-0" />
                    <span className={`${rf} text-[13px] font-medium`}>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {!isCollapsed && <div className="my-1 border-t border-zinc-100" />}

              {isLoading && <SidebarSkeleton isCollapsed={isCollapsed} />}

              {!isLoading && tree && tree.filter(item => item.path !== 'Home.md').map((item) => {
                if (item.type === "tree") {
                  return <FolderItem key={item.fullPath} folder={item as Directory} />;
                }
                const file = item as FileType;
                const isActive = pathname?.includes(file.fullPath);
                return (
                  <SidebarMenuItem key={file.fullPath}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={file.path.replace(".md", "")} className="hover:bg-zinc-100 rounded-md text-zinc-600 hover:text-zinc-900">
                      <Link href={`/library/${file.fullPath}`} className="flex items-center gap-2">
                        <span className="size-3.5 shrink-0 flex items-center justify-center">
                          <span className="size-1.5 rounded-full bg-zinc-400 block" />
                        </span>
                        <span className={`${rf} text-[13px] font-medium truncate`}>{file.path.replace(".md", "")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              {!isLoading && (!tree || tree.length === 0) && (
                <SidebarMenuItem>
                  <div className={`${rf} px-3 py-8 text-center text-sm text-zinc-400`}>No notes yet</div>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
