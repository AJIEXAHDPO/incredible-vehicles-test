import { YMapLocation } from "@yandex/ymaps3-types/imperative/YMap";
import { YMap, YMapComponentsProvider, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer } from "ymap3-components";

export const ProdMap = ({ pointLocation }: { pointLocation: YMapLocation }) => {
    return (
        <YMapComponentsProvider apiKey={"9072a672-d5e4-4055-8ea8-6bdb6d3a1d2f"}>
            <YMap location={pointLocation} mode="vector">
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapDefaultMarker coordinates={pointLocation.center} />
            </YMap>
        </YMapComponentsProvider>
    );
}