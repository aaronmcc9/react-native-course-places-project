import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces() {

    const isFocused = useIsFocused();
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    useEffect(() => {
        async function loadPlaces() {
            await fetchPlaces();
        }

        if (isFocused) {
            loadPlaces();
            // setLoadedPlaces(currPlaces => [...currPlaces, route.params.place])
        }
    }, [isFocused])
    return <PlacesList places={loadedPlaces} />
}
export default AllPlaces;