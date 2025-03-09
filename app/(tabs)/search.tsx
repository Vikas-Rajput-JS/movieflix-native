import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";

import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";

import SearchBar from "@/components/SearchBar";
import MovieDisplayCard from "@/components/MovieCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  // Debounced search effect
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  const jsonMovies = [
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [],
      id: 850931,
      original_language: "en",
      original_title: "From...",
      overview:
        "This visual and musical feast sets the table for rich conversations about identity, belonging, creative expression, cultural appreciation + appropriation, and the complex terrain between intent, impact, and personal responsibility. Through Kim Villagante's (aka Kimmortal) journey into the heart of who they are, and 'what they love' is doubtlessly unique, this story will deeply resonate with many 2nd generation immigrant youth. This short's candid portrayal of the push/pull between adolescent pressures to conform, and 'stand out' also offers widely relatable gems of wisdom that can help us all along the way.",
      popularity: 4.387,
      poster_path: "/z9QjguiqkuhPWD26SnLGlicSaQj.jpg",
      release_date: "2020-10-22",
      title: "From...",
      video: false,
      vote_average: 7.5,
      vote_count: 2,
    },
    {
      adult: false,
      backdrop_path: "/uLJhJsLHchuhNoqrfwf5F3Tmpsg.jpg",
      genre_ids: [878, 35, 28],
      id: 1242372,
      original_language: "zh",
      original_title: "从21世纪安全撤离",
      overview:
        'On Planet K, unknown to anyone on Earth, three teenagers chosen by fate can travel back and forth twenty years into the future by sneezing. In the face of a shocking plot to destroy the world, they have nothing but crystal-clear stupidity and single-digit combat power, so how can they transform into heroes and fight against the super-villainous villains who are intent on destroying the world? The "King Bomb" brothers, who look like grown-ups but have minds like no other, will save the future on behalf of the K-Star!',
      popularity: 23.574,
      poster_path: "/6jgXcjisegB0XBzIvIiKo0aLFc.jpg",
      release_date: "2024-07-18",
      title: "Escape from the 21st Century",
      video: false,
      vote_average: 6.677,
      vote_count: 65,
    },
    {
      adult: true,
      backdrop_path: "/5Y32Od6HarKB9lVFftwApWlJBYl.jpg",
      genre_ids: [99, 10751],
      id: 916404,
      original_language: "ja",
      original_title:
        "女子会してるお宅にM男くんが突撃参加！ お泊り女子会で夕方から朝がくるまで一日中犯●れて小悪魔中出しされる！ 白桃はな 花狩まい",
      overview:
        "MIAA-525: Hana Hakuto and Mai Kagari gently and sweetly blame the cute M man who has participated in the girls' association assault! No acting or script! Ad lib fully open! Go shopping, eat with three people, and feel euphoric! !! Two cool girls are impatient, show off their lesbians, and shoot with a sweet sad blame! Nipple torture and SEX that lasts from evening to morning. A dream-like day where you can have fun and get a vaginal cum shot! Such a harem day may come to you.",
      popularity: 95.939,
      poster_path: "/tDySCExoDeCPTVH9Own1C5FfLYk.jpg",
      release_date: "2021-11-12",
      title:
        "Submissive Man Suddenly Shows Up At A Sleepover And Gets Teased By And Cums Inside Two Devilishly Cute Girls From Sundown To Sunup! Starring Hana Shirato and Mai Kagari",
      video: true,
      vote_average: 7,
      vote_count: 1,
    },
    {
      adult: false,
      backdrop_path: "/5zMfSDaRprrT6chygNHQeHKafxl.jpg",
      genre_ids: [10751, 28, 12],
      id: 946310,
      original_language: "nl",
      original_title: "De Piraten van Hiernaast II: De Ninja's van de Overkant",
      overview:
        "The pirates feel right at home in Sandborough, but the atmosphere cools right down when the ninjas come to live in the street. After all, pirates and ninjas are sworn enemies!  While pirate captain Hector Blunderbuss struggles to get rid of his new neighbours, son Billy and ninja daughter Yuka become friends. The pirates challenge the ninjas to the ultimate battle at the village's annual hexathlon. Who will win the match? Ninjas are faster and more agile of course, but pirates are the best cheats in all of the seven seas...",
      popularity: 4.02,
      poster_path: "/uDsvma9dAwnDPVuCFi99YpWvBk0.jpg",
      release_date: "2022-04-20",
      title: "Pirates Down the Street II: The Ninjas from Across",
      video: false,
      vote_average: 6.5,
      vote_count: 165,
    },
    {
      adult: false,
      backdrop_path: "/qcgoOoKbhy88KLKaLi2Svlyznv9.jpg",
      genre_ids: [18],
      id: 1134791,
      original_language: "es",
      original_title: "Viento Sur",
      overview:
        "A lighthouse keeper and her late brother's best friend live together in a lighthouse, waiting for the south wind to scatter the ashes of the deceased.",
      popularity: 0.41,
      poster_path: "/ul1hqHhXPI1dc9kAgNDf2A5PqWn.jpg",
      release_date: "2023-07-14",
      title: "A Wind from the South",
      video: false,
      vote_average: 6.2,
      vote_count: 4,
    },
    {
      adult: false,
      backdrop_path: "/gyfFlHeNpAZlnP0G1QKKwitwTeA.jpg",
      genre_ids: [53],
      id: 1362648,
      original_language: "es",
      original_title: "Los iniciados: El diario de las sombras",
      overview:
        "The formerly revered journalist Frank Molina finds himself in hiding, with his career shattered. However, he continues to write anonymously hidden in the shadows. Frank’s sense of calm is abruptly interrupted when a pair of severed eyes and a blood-soaked note appear at his door. As the number of victims increases, Frank will need to unblock his traumatic past if he seeks to find the killer.",
      popularity: 1.481,
      poster_path: "/6340ZG3qHfS7q8ES5rwf4AQ0U1w.jpg",
      release_date: "2024-09-27",
      title: "The Initiated: Written from the Shadows",
      video: false,
      vote_average: 6.5,
      vote_count: 16,
    },
    {
      adult: false,
      backdrop_path: "/poTFhNtA1kZa3Qb6ulCwa5HPEKb.jpg",
      genre_ids: [16, 878, 28, 12],
      id: 304023,
      original_language: "ja",
      original_title: "楽園追放 -Expelled from Paradise-",
      overview:
        "A.D. 2400, DEVA's central council detects an incident of unauthorized access into their mainframe. Someone on Earth was trying to hack into the system. The only information DEVA was able to retrieve was that hacker referred to themselves as \"Frontier Setter.\"  To investigate the mysterious hacker's motives, the high officials of DEVA dispatch system Security Third Officer Angela Balzac to the Earth's surface. Equipped with a prosthetic \"material body,\" Angela attempts to make contact with a local agent Dingo, but what awaited her instead was a swarm of Sandworms now infesting the Earth's surface. Angela intercepts the gruesome pests with her exoskeleton powered suit Arhan.",
      popularity: 3.565,
      poster_path: "/jLJWlF42o3JW7zgZdoBBx8ZRGug.jpg",
      release_date: "2014-11-15",
      title: "Rakuen Tsuiho: Expelled from Paradise",
      video: false,
      vote_average: 6.4,
      vote_count: 89,
    },
    {
      adult: false,
      backdrop_path: "/uEqrGVBELVFaNVMOE4ExjLCMV3j.jpg",
      genre_ids: [28, 53, 80],
      id: 51608,
      original_language: "ko",
      original_title: "아저씨",
      overview:
        "An ex-special agent is involved in a convoluted drug ring drama. He has to save a drug smuggler's innocent daughter from being the victim of her parents' fight.",
      popularity: 8.323,
      poster_path: "/ld19CFIo27t41JXSGZdaPMUGTxh.jpg",
      release_date: "2010-08-04",
      title: "The Man from Nowhere",
      video: false,
      vote_average: 7.7,
      vote_count: 1349,
    },
    {
      adult: false,
      backdrop_path: "/nXl2qbJwityuZNjWvuTXwDm8jee.jpg",
      genre_ids: [18],
      id: 1287706,
      original_language: "pl",
      original_title: "Przez ciebie, po tobie",
      overview:
        "The meeting of Adam and his father Piotr forces both men to confront their not always pleasant feelings and accusations, as well as look back at one generation: at their grandfather and his decisions.",
      popularity: 0.584,
      poster_path: "/sKT4F2cuM9gUOS9MEH1HeCwGc6S.jpg",
      release_date: "2024-05-27",
      title: "From You",
      video: false,
      vote_average: 10,
      vote_count: 1,
    },
    {
      adult: false,
      backdrop_path: "/ycrENJae8E9siHoplVONQrkIZJy.jpg",
      genre_ids: [99],
      id: 895179,
      original_language: "ko",
      original_title: "듣보인간의 생존신고",
      overview:
        "Just before Lee Seungyoon became famous after winning the music audition program Sing Again, two women just went to “Unknown-musician” Seungyoon without any notice. One day in 2018, the two, who were going through a very tough time, happened to listen to his song and it healed their wounded hearts. After two years, they boldly suggest him to make his music video without any experience. Starting with the ridiculous proposal, their adventurous journey begins.",
      popularity: 0.116,
      poster_path: "/jlcdYLCRXQqBoGTt1ymsZGuT501.jpg",
      release_date: "2023-09-06",
      title: "Notes from the Unknown",
      video: false,
      vote_average: 6,
      vote_count: 2,
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [16, 27, 878],
      id: 272108,
      original_language: "ja",
      original_title: "淫獣エイリアン",
      overview:
        "The all female crew of the transport ship Muse is on a mission in deep space. They pick up an SOS signal and discover a derelict space cruiser where all the women have died mysteriously. They take the only survivor, a young woman named Flair, and detonate the ghost ship. However, the danger is just beginning. With Flair on the Muse, the romances between the women begin to take a new turn. One by one, the crewmembers are attacked by a mysterious alien presence, desperate to find a way to reproduce with human women!",
      popularity: 6.716,
      poster_path: "/dbxpznxnTpR5MCl0bdDRor7j4qK.jpg",
      release_date: "1997-01-24",
      title: "Alien from the Darkness",
      video: false,
      vote_average: 5.8,
      vote_count: 10,
    },
    {
      adult: false,
      backdrop_path: "/mazqYfDUreT2KE6ZsaWT59JARHZ.jpg",
      genre_ids: [16, 18],
      id: 83389,
      original_language: "ja",
      original_title: "コクリコ坂から",
      overview:
        "Yokohama, 1963. Japan is picking itself up from the devastation of World War II and preparing to host the 1964 Olympics—and the mood is one of both optimism and conflict as the young generation struggles to throw off the shackles of a troubled past. Against this backdrop of hope and change, a friendship begins to blossom between high school students Umi and Shun—but a buried secret from their past emerges to cast a shadow on the future and pull them apart.",
      popularity: 6.735,
      poster_path: "/rRLYX4RZIyloHSJwvZKAhphAjiB.jpg",
      release_date: "2011-07-16",
      title: "From Up on Poppy Hill",
      video: false,
      vote_average: 7.537,
      vote_count: 1785,
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [99],
      id: 1288640,
      original_language: "uk",
      original_title:
        "22 квітня 2023 року з 13:05 до 13:11 в Ірпені нічого не відбувалось",
      overview:
        "This short film is a grotesque reflection of the threat of death that could come at any moment from Russian missiles and other weapons. This artistic expression sends a shout-out to John Smith, an English avant-garde director. Film is an embodiment of the idea that a person feels safe when he or she has a sense of control.",
      popularity: 0.22,
      poster_path: "/kdgXT8BSfpqab1BvPiu2tjWMK3g.jpg",
      release_date: "2024-06-04",
      title:
        "On April 22, 2023, from 13:05 to 13:11, Nothing Happened in Irpin",
      video: false,
      vote_average: 4,
      vote_count: 1,
    },
    {
      adult: false,
      backdrop_path: "/x5ufEAM7bS7DVXaovApamQh5BNE.jpg",
      genre_ids: [16, 14, 12],
      id: 37933,
      original_language: "ja",
      original_title: "ゲド戦記",
      overview:
        "Something bizarre has come over the land. The kingdom is deteriorating. People are beginning to act strange... What's even more strange is that people are beginning to see dragons, which shouldn't enter the world of humans. Due to all these bizarre events, Ged, a wandering wizard, is investigating the cause. During his journey, he meets Prince Arren, a young distraught teenage boy. While Arren may look like a shy young teen, he has a severe dark side, which grants him strength, hatred, ruthlessness and has no mercy, especially when it comes to protecting Teru. For the witch Kumo this is a perfect opportunity. She can use the boy's \"fears\" against the very one who would help him, Ged.",
      popularity: 7.265,
      poster_path: "/y0VnJt4eRPMjA1hpJ8f1EFoVaSf.jpg",
      release_date: "2006-07-29",
      title: "Tales from Earthsea",
      video: false,
      vote_average: 6.5,
      vote_count: 1339,
    },
    {
      adult: false,
      backdrop_path: "/8R7m6c7krHGA2FkcADQW136EdRR.jpg",
      genre_ids: [18],
      id: 86461,
      original_language: "it",
      original_title: "Hanna D. - La ragazza del Vondel Park",
      overview:
        "Hanna is a girl completely abandoned to herself, is not at all inhibited sexually, and is attracted to the attention of unscrupulous people like Miguel, who takes advantage of Hanna, turning her to prostitution to obtain her drug fix. Until she meets Alex, a young man with a sincere affection for Hanna.",
      popularity: 9.98,
      poster_path: "/AuitScFmK0bbJ3IDV54PfSO8aJ0.jpg",
      release_date: "1984-11-02",
      title: "Hanna D: The Girl from Vondel Park",
      video: false,
      vote_average: 3.6,
      vote_count: 6,
    },
    {
      adult: false,
      backdrop_path: "/5Y0Ut7LMDa60cUMwwsk1p24lnox.jpg",
      genre_ids: [28, 9648, 12],
      id: 937013,
      original_language: "zh",
      original_title: "老九门之青山海棠",
      overview:
        "At the beginning of the 20th century, Zhang Qi Shan and his father were subject to experimentation by the traitor Zuo Qian Zhi. Ten years later, Zhang Qi Shan seeks his revenge. He arrives in Changsha for the first time and meets Er Yue Hong. The two join forces to go against Zuo Qian Zhi and the monster that threatens the city.",
      popularity: 4.321,
      poster_path: "/cVWYG9W7jNaElA4U7naT6o9JhdF.jpg",
      release_date: "2022-02-10",
      title: "The Mystic Nine: Begonia from Qingshan",
      video: false,
      vote_average: 5.643,
      vote_count: 14,
    },
    {
      adult: false,
      backdrop_path: "/zIb0iS1wem45wfmhpdDjQN8vD91.jpg",
      genre_ids: [35, 878],
      id: 10516,
      original_language: "fr",
      original_title: "Le Gendarme et les Extra-terrestres",
      overview:
        "The bungling inspector Cruchot finds himself trying to save the residents of St. Tropez from some oil-drinking humanoid aliens. The only way to tell the aliens from the real people, besides their constant thirst for oil-products, is that they sound like empty garbage cans when you touch them. Chaos is ahead.",
      popularity: 3.863,
      poster_path: "/3ZuUIAOjzT3rLkaSaIHB30UQZv3.jpg",
      release_date: "1979-01-31",
      title: "The Gendarme and the Creatures from Outer Space",
      video: false,
      vote_average: 6.1,
      vote_count: 617,
    },
    {
      adult: false,
      backdrop_path: "/iilHEhKoiQF66BTMfsXsDrkeugC.jpg",
      genre_ids: [28, 35],
      id: 41387,
      original_language: "cn",
      original_title: "國產凌凌漆",
      overview:
        "After a giant dinosaur skull is stolen, the head of the Chinese secret police decides to assign the case to the force's most incompetent reject: a rural butcher who stands around all day drinking martinis (shaken, not stirred). With a trunkload of insanely useless gadgets and a contact who constantly tries to kill him, the young agent must locate the skull and find out just what is going on here.",
      popularity: 3.599,
      poster_path: "/k8VaBQYP55yEKD5tNRjn8Egf4rc.jpg",
      release_date: "1994-10-13",
      title: "From Beijing with Love",
      video: false,
      vote_average: 6.9,
      vote_count: 187,
    },
    {
      adult: false,
      backdrop_path: "/gt4EnUGbbGbNOX0q47YII3WxB48.jpg",
      genre_ids: [878, 18],
      id: 13363,
      original_language: "en",
      original_title: "The Man from Earth",
      overview:
        "An impromptu goodbye party for Professor John Oldman becomes a mysterious interrogation after the retiring scholar reveals to his colleagues he never ages and has walked the earth for 14,000 years.",
      popularity: 6.75,
      poster_path: "/x795RrV92JbLXh4pBSEEe62Nmv0.jpg",
      release_date: "2007-06-10",
      title: "The Man from Earth",
      video: false,
      vote_average: 7.623,
      vote_count: 2564,
    },
    {
      adult: false,
      backdrop_path: "/8HFb52gohuQGu0zK6bkMtD1RJKw.jpg",
      genre_ids: [18],
      id: 1277838,
      original_language: "tl",
      original_title: "Mga Lalaki Mula QC, Mga Babae Mula Alabang",
      overview:
        "Two lovers navigate post-graduation life, facing challenges of long-distance relationship and career demands. Their perspectives on shared experiences diverge as physical and emotional distance grows, straining their bond over time.",
      popularity: 0.901,
      poster_path: "/sziLF3lbukv5f8mEbbG3sV0Cheh.jpg",
      release_date: "2024-05-01",
      title: "Men Are From QC, Women Are From Alabang",
      video: false,
      vote_average: 5.2,
      vote_count: 8,
    },
  ];
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        // Call updateSearchCount only if there are results
        if (movies?.length! > 0 && movies?.[0]) {
          await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        className="px-5"
        data={jsonMovies as Movie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieDisplayCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {/*             {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )} */}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              jsonMovies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
