"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, FileText, Folder, Home, X } from "lucide-react";
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
import { dmSans } from "@/lib/fonts";

function FileItem({ file }: { file: FileType }) {
  const pathname = usePathname();
  const isActive = pathname?.includes(file.fullPath);

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild isActive={isActive} size="sm">
        <Link href={`/library/${file.fullPath}`} className="text-zinc-600 hover:text-zinc-900">
          <span className="truncate">{file.path.replace(".md", "")}</span>
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
          <SidebarMenuButton className="text-zinc-800 hover:bg-zinc-100">
            <Folder className="size-4 text-zinc-400 shrink-0" />
            <span className="font-medium truncate">{folder.path}</span>
            <ChevronDown className="ml-auto size-4 text-zinc-400 transition-transform shrink-0 group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="border-l border-zinc-200 ml-3">
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
    <Sidebar collapsible="icon" className={dmSans.className}>
      <SidebarHeader className="border-b border-zinc-100 p-0 overflow-hidden">
        {/* Expanded state */}
        {!isCollapsed && (
          <div>
            {/* Cover Image - taller */}
            <div className="w-full h-32 overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/40/46/27/404627e9adabdd941edf659e358405a7.jpg"
                alt="Cover"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Name & Label with X button */}
            <div className="px-4 py-3 flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-zinc-900 text-sm">oluwasijibomi</h2>
                <p className="text-[11px] text-zinc-400 mt-0.5">Digital Garden</p>
              </div>
              <Link
                href="/"
                className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
                title="Back to home"
              >
                <X className="size-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Collapsed state - aligned with menu icons */}
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isHomeActive} tooltip="Home" className="hover:bg-zinc-100">
                  <Link href="/library/Home.md" className="text-zinc-800">
                    <Home className="size-4 text-zinc-400 shrink-0" />
                    <span className="font-medium truncate">Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Loading skeleton */}
              {isLoading && (
                <>
                  {[1, 2, 3].map((i) => (
                    <SidebarMenuItem key={i}>
                      <div className="h-8 w-full animate-pulse rounded-md bg-zinc-100" />
                    </SidebarMenuItem>
                  ))}
                </>
              )}

              {/* Tree items */}
              {!isLoading && tree && tree.filter(item => item.path !== 'Home.md').map((item) => {
                if (item.type === "tree") {
                  return <FolderItem key={item.fullPath} folder={item as Directory} />;
                }
                const file = item as FileType;
                const isActive = pathname?.includes(file.fullPath);
                return (
                  <SidebarMenuItem key={file.fullPath}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={file.path.replace(".md", "")} className="hover:bg-zinc-100">
                      <Link href={`/library/${file.fullPath}`} className="text-zinc-800">
                        <FileText className="size-4 text-zinc-400 shrink-0" />
                        <span className="font-medium truncate">{file.path.replace(".md", "")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              {/* Empty state */}
              {!isLoading && (!tree || tree.length === 0) && (
                <SidebarMenuItem>
                  <div className="px-3 py-8 text-center text-sm text-zinc-400">
                    No notes yet
                  </div>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
