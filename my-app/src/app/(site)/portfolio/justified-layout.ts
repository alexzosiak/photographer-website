export type PhotoPosition = {
    left: number;
    top: number;
    width: number;
    height: number;
};

type LayoutOptions = {
    gap: number;
    targetHeight: number;
    maxRowItems: number;
};

// Keep source order and choose the row size closest to the desired height.
// Every image in a row uses the same scale, preserving its original proportions.
export function getJustifiedLayout(
    aspectRatios: number[],
    containerWidth: number,
    { gap, targetHeight, maxRowItems }: LayoutOptions,
): { positions: PhotoPosition[]; height: number } {
    if (containerWidth <= 0 || aspectRatios.length === 0) {
        return { positions: [], height: 0 };
    }

    const ratios = aspectRatios.map((ratio) =>
        Number.isFinite(ratio) && ratio > 0 ? ratio : 1.5,
    );
    const positions: PhotoPosition[] = [];
    const spacing = Math.min(Math.max(0, gap), containerWidth / 10);
    const rowLimit = Math.max(1, Math.min(
        Math.floor(maxRowItems),
        Math.floor(containerWidth / (spacing + 1)),
    ));
    let start = 0;
    let top = 0;

    while (start < ratios.length) {
        let end = start;
        let ratioSum = 0;

        while (end < ratios.length) {
            ratioSum += ratios[end];
            end += 1;
            const count = end - start;
            const height = (containerWidth - spacing * (count - 1)) / ratioSum;

            if (height <= targetHeight || count >= rowLimit) {
                if (count > 1) {
                    const previousSum = ratioSum - ratios[end - 1];
                    const previousHeight = (containerWidth - spacing * (count - 2)) / previousSum;

                    if (Math.abs(previousHeight - targetHeight) < Math.abs(height - targetHeight)) {
                        end -= 1;
                        ratioSum = previousSum;
                    }
                }
                break;
            }
        }

        const fullRowHeight = (containerWidth - spacing * (end - start - 1)) / ratioSum;
        // Avoid enlarging a few remaining photos to fill the final row.
        const height = end === ratios.length ? Math.min(targetHeight, fullRowHeight) : fullRowHeight;
        let left = 0;

        for (let index = start; index < end; index += 1) {
            const width = ratios[index] * height;
            positions.push({ left, top, width, height });
            left += width + spacing;
        }

        top += height + spacing;
        start = end;
    }

    return { positions, height: top - spacing };
}
