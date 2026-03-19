import { CONFIG } from "@/lib/config";
import {
	TreeUrl,
	structureRepositoryData,
} from "@/lib/library";
import axios from "axios";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
	try {
		const headers = {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${CONFIG.GITHUB_TOKEN}`,
		};

		const response = await axios.get(TreeUrl, { headers });
		const directory = structureRepositoryData(response.data.tree);

		return NextResponse.json({ directory: directory });
	} catch (error) {
		console.error("Explorer API error:", error);
		return new NextResponse("Failed to fetch Explorer", { status: 500 });
	}
}
