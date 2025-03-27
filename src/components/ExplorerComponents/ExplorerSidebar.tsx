"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Directory, File } from "@/lib/library";
import { setItemForPath } from "@/store/pathStorage";
import { useInterface } from "@/store/InterfaceStore";

interface ExplorerItemProps {
  item: Directory | File;
  onClick: (path: string) => void;
  depth?: number;
}

import Link from "next/link";

function ExplorerItem({ item, onClick, depth = 0 }: ExplorerItemProps) {
  const isDirectory = item.type === "tree";
  const paddingLeft = `${depth * 1}rem`; // Indentation based on depth

  const renderChildren = () => {
    if (isDirectory) {
      const directory = item as Directory;
      return directory.files.map((child) => (
        <ExplorerItem
          key={child.fullPath}
          item={child}
          onClick={onClick}
          depth={depth + 1} // Increase depth for child items
        />
      ));
    }
    return null;
  };

  return (
    <>
      <div className="pl-0">
        <Link
          href={`/library/${encodeURIComponent(item.fullPath)}`}
          //onClick={() => onClick(item.fullPath)}
        >
          <p
            className={`
              text-sm underline font-semibold
              ${
                isDirectory
                  ? "text-gray-700 hover:text-orange-500 no-underline"
                  : "text-gray-600 hover:text-orange-500"
              }
            `}
            style={{ paddingLeft }} // Apply indentation
          >
            {isDirectory
              ? (item as Directory).path
              : (item as File).path.slice(0, -3)}
          </p>
        </Link>
      </div>
      {renderChildren()}
    </>
  );
}
export function ExplorerSidebar() {
  const [tree, setTree] = useState<Directory[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { onClose } = useInterface();
  const router = useRouter();

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

  return (
    <Sidebar variant="inset" className="">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="flex items-center">
                <div className="flex items-center justify-center size-8 rounded-lg bg-orange-500 text-white">
                  <Bookmark className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none ml-2">
                  <span className="font-semibold text-gray-900">Library</span>
                  <span className="text-xs text-gray-500">Explorer</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="p-2 overflow-y-auto max-h-[calc(100vh-200px)]">
        {isLoading ? (
          <p className="text-sm text-gray-500 p-4"></p>
        ) : tree && tree.length > 0 ? (
          tree.map((item) => (
            <ExplorerItem
              key={item.fullPath}
              item={item}
              onClick={handleClick}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 p-4">No items found</p>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
