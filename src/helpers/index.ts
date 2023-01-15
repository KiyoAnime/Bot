import Client from "@/Client";
import database from "./database";
import dayjs from "./dayjs";
import environment from "./environment";

export default (client: Client) => {
    dayjs();
    database();
    environment();
};
