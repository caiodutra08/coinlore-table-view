"use client";

import { useCallback, useEffect, useState } from "react";

export default function useWindow() {
	const isMobile = () => {
		return window && window.innerWidth < 768;
	};

	const isTablet = () => {
		return window && window.innerWidth >= 768 && window.innerWidth < 1024;
	};

	const isDesktop = () => {
		return window && window.innerWidth >= 1024;
	};
	

	const [windowWidth, setWindowWidth] = useState(0);

	const whichDevice = useCallback(() => {
		if (isMobile()) {
			return "mobile";
		}
		if (isTablet()) {
			return "tablet";
		}
		if (isDesktop()) {
			return "desktop";
		}

		return "unknown";
	}, []);

	const [device, setDevice] = useState(whichDevice());

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		setDevice(whichDevice());

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [windowWidth, whichDevice]);

	return device;
}
