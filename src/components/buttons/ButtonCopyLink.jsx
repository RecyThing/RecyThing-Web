import { Box, IconButton } from "@chakra-ui/react";
import { CopyIcon } from "@/components/icons";
import { MdOutlineCheck } from "react-icons/md";
import { useCustomToast } from "@/hooks";
import { useEffect, useState } from "react";

export function ButtonCopyLink({ link, containerProps = { position: "absolute", top: "0", right: "0", zIndex: "1" }, ...props }) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(link);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	useEffect(() => {
		return () => {
			clearTimeout();
		};
	}, [isCopied]);

	useCustomToast(isCopied && "success", "Link berhasil disalin");

	return (
		<Box {...containerProps}>
			<IconButton
				size="sm"
				onClick={isCopied ? null : handleCopy}
				icon={isCopied ? <MdOutlineCheck /> : <CopyIcon />}
				_hover={{ bg: "gray.100" }}
				{...props}
			/>
		</Box>
	);
}
