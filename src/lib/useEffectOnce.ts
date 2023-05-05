import { useRef, useEffect, useState } from "react";

export default function useEffectOnce(
	effect: (() => void) | (() => () => void)
) {
	const effectFn = useRef(effect);
	const destroyFn = useRef<void | typeof effect | undefined>();
	const effectCalled = useRef<boolean>(false);
	const rendered = useRef<boolean>(false);
	const [, refresh] = useState(0);

	if (effectCalled.current) {
		rendered.current = true;
	}

	useEffect(() => {
		if (!effectCalled.current) {
			destroyFn.current = effectFn.current();
			effectCalled.current = true;
		}

		refresh(1);

		return () => {
			if (rendered.current === false) return;
			if (destroyFn.current) destroyFn.current();
		};
	}, []);
}
