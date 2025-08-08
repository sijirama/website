import { CONFIG } from "@/lib/config";
import {
	Directory,
	File,
	TreeUrl,
	structureRepositoryData,
} from "@/lib/library";
import axios from "axios";
import { NextResponse } from "next/server";

const WhitelistedFIles = ["00 Writing", "01 Resources", "Home.md"];

export async function GET() {
	try {
		const headers = {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${CONFIG.GITHUB_TOKEN}`,
		};

		const response = await axios.get(TreeUrl, { headers });
		const directory = structureRepositoryData(response.data.tree);

		const approvedDir = directory.filter((file) =>
			WhitelistedFIles.includes(file.path),
		);

		return NextResponse.json({ directory: approvedDir });
	} catch (error) {
		return new NextResponse("Failed to fetch Exxplorer");
	}
}
