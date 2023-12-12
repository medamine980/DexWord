import { useCallback, useEffect, useRef, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Iconv, { decode, encode } from 'iconv-lite';
import fetchDefinitions from "../util/fetchDefinitions";
import fetchSynonyms from "../util/fetchSynonyms";
import { RootState } from "../redux/store";

interface useFetchParams {
    query: string,
    category: AvailableTabsOptions,
    timeoutInMilliSeconds?: number
}


const useFetch = ({ query, category, timeoutInMilliSeconds = 5000 }: useFetchParams) => {
    let abortController: AbortController;
    // let lastTimeoutId = useRef<NodeJS.Timeout>();
    const [data, setData] = useState<TranslationData[] | SynonymData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const { srcLang, destLang } = useSelector((state: RootState) => state.language);
    const fetchData = async () => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
        setLoading(true);
        // console.log("loading true at 23");
        // clearTimeout(lastTimeoutId.current);
        // lastTimeoutId.current = setTimeout(() => {
        //     if (loading) abortController.abort();
        //     console.log("abortion: ", loading);
        // }, timeoutInMilliSeconds);
        try {
            let data: TranslationData[] | SynonymData[];
            if (category === "definitions")
                data = await fetchDefinitions({ query, srcLang, destLang, abortController });
            else
                data = await fetchSynonyms({ query, srcLang, destLang, abortController })
            setData(data);
            if (error) setError(null);
            setLoading(false);
        } catch (error: any) {
            if (loading) {
                setData([]);
                console.log(error);
                setLoading(false);
                if (error.name === "AbortError") {
                    setError("Timed out! either the connection is too slow or it doesn't even exist");
                } else {
                    setError(error.message ?? error);
                }
            }
        }
    }
    useEffect(() => {
        fetchData();
    }, [query, category, srcLang, destLang]);


    useLayoutEffect(() => {
        console.log("Fetching...");
        setLoading(true);
    }, [srcLang, destLang, query, category]);

    const refetchData = () => {
        setLoading(true);
        fetchData();
    }
    return { data, loading, error, refetchData, setLoading };
}

export default useFetch;