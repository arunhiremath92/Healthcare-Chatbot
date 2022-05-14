import http from "k6/http";
import { sleep } from "k6";

const SLEEP_DURATION = 0.1;

const MAX_USERS = __ENV.MAX_USERS || 50;

export const options = {
    stages: [
        { duration: "15s", target: MAX_USERS },
        { duration: "30s", target: MAX_USERS },
        { duration: "15s", target: 0 }
    ],
    thresholds: {
        http_req_duration: ["p(95)<1000"]
    }
};

const BASE_URL = __ENV.API_BASE === "remote" ? "https://healthcare-frontend-admin.herokuapp.com/" : "http://localhost:3002";
const ENDPOINT = __ENV.ENDPOINT || "";

export default function() {
    const url = `${BASE_URL}${ENDPOINT}`;
    http.get(url);
    sleep(SLEEP_DURATION);
};
