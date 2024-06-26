"use client";

import axios from "axios";
import DataTable from "@/components/DataTable";
import useColumns from "@/hooks/useColumn";
import React, { useCallback, useEffect, useState } from "react";

export default function Home() {
	const [data, setData] = useState([]);
	const { columnsData } = useColumns();

	const fetch = useCallback(async () => {
		try {
			const { data: resp } = await axios.get(
				"https://api.coinlore.net/api/tickers/",
			);
			const data = resp.data;
			data.forEach((item: any) => {
				item.combined = `${item.nameid} ${item.id}`;
			});
			setData(data);
		} catch (error) {
			throw new Error("Failed to fetch data");
		}
	}, []);

	useEffect(() => {
		fetch();
	}, []);

	return <DataTable data={data} columns={columnsData} />;
}
