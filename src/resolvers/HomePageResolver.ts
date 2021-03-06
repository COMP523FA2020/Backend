import { Field, ObjectType, Query, Resolver } from "type-graphql";
import { getManager } from "typeorm";

@ObjectType()
export class AvianTableStats {
    @Field()
    numSpecies: string;

    @Field()
    numStudies: string;

    @Field()
    numRecords: string;

    @Field()
    lastUpdated: string;
}

@Resolver()
export class HomePageResolver {
    @Query(() => AvianTableStats)
    async getAvianTableStats() {
        const speciesCount = await getManager().query("SELECT COUNT(DISTINCT common_name) as count FROM avian_diet");
        const studiesCount = await getManager().query("SELECT COUNT(DISTINCT source) as count FROM avian_diet");
        const recordsCount = await getManager().query("SELECT COUNT(*) as count FROM avian_diet");
        const updateTime = await getManager().query("SELECT last_updated FROM table_history WHERE table_name = \"avian_diet\"");
        return { numSpecies: speciesCount[0]["count"], numStudies: studiesCount[0]["count"], numRecords: recordsCount[0]["count"], lastUpdated: updateTime[0] ? updateTime[0]["last_updated"] : "N/A" };
    }
}