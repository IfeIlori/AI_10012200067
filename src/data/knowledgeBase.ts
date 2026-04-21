export interface KBChunk {
  id: string;
  src: string;
  cat: string;
  text: string;
  kw: string[];
  page?: number;
  score?: number;
}

export const KB: KBChunk[] = [
  {
    id: "el1", src: "Ghana_Election_Result.csv", cat: "Election · 2024 Presidential",
    text: "In the 2024 Ghana Presidential Election, John Dramani Mahama of the National Democratic Congress (NDC) won with 56.55% of valid votes cast (6,328,625 votes). Mahamudu Bawumia of the New Patriotic Party (NPP) received 41.61% (4,657,304 votes). Alan Kyerematen (Independent) got 0.56%, and Nana Akosua Frema Osei-Opare (CPP) received 0.06%. Total valid votes cast were 11,196,241 out of 17,866,584 registered voters, giving a turnout of approximately 60.88%.",
    kw: ["2024","presidential","election","mahama","bawumia","ndc","npp","winner","votes","results","turnout","kyerematen"]
  },
  {
    id: "el2", src: "Ghana_Election_Result.csv", cat: "Election · 2024 Parliamentary",
    text: "The 2024 Ghanaian parliamentary election produced a historic result: the NDC won 183 seats, the NPP won 88 seats, and independent candidates won 4 seats in the 275-member Parliament of Ghana. This gave the NDC a dominant parliamentary majority, a significant swing from the previous parliament where seats were almost evenly split between the two parties.",
    kw: ["2024","parliament","seats","ndc","npp","legislative","independent","majority","constituencies"]
  },
  {
    id: "el3", src: "Ghana_Election_Result.csv", cat: "Election · 2020 Presidential",
    text: "In the 2020 Ghana Presidential Election, incumbent Nana Addo Dankwa Akufo-Addo (NPP) won re-election with 51.59% of valid votes (6,730,413 votes). John Dramani Mahama (NDC) received 47.36% (6,214,889 votes). The Electoral Commission declared the results on December 9, 2020. Voter turnout was approximately 79% of 17,027,286 registered voters. Mahama and the NDC disputed the results, though the Supreme Court dismissed the petition.",
    kw: ["2020","akufo-addo","mahama","ndc","npp","election","presidential","turnout","dispute","petition"]
  },
  {
    id: "el4", src: "Ghana_Election_Result.csv", cat: "Election · 2020 Parliamentary",
    text: "The 2020 parliamentary elections resulted in the NPP winning 137 seats and the NDC winning 137 seats : a near-even split of the 275-seat Parliament. Independent candidates won 1 seat. This created a hung parliament where the NPP retained a marginal advantage only due to the Vice President's casting vote. It was described as the most competitive parliamentary election in Ghana's Fourth Republic.",
    kw: ["2020","parliament","seats","hung","ndc","npp","split","competitive","fourth republic"]
  },
  {
    id: "el5", src: "Ghana_Election_Result.csv", cat: "Election · 2016 Presidential",
    text: "In the 2016 Ghana Presidential Election, Nana Addo Dankwa Akufo-Addo (NPP) won with 53.85% of valid votes against incumbent John Dramani Mahama (NDC) who received 44.40%. This was Akufo-Addo's third presidential bid. Voter turnout was approximately 68.60%. The NPP also won a majority in parliament with 169 seats to the NDC's 106 seats.",
    kw: ["2016","akufo-addo","mahama","ndc","npp","election","presidential","turnout","parliament"]
  },
  {
    id: "el6", src: "Ghana_Election_Result.csv", cat: "Election · Regional Breakdown 2024",
    text: "In the 2024 elections, Mahama and the NDC won all regions in the Northern, Volta, Central and Western belts. The NPP retained some strength in the Ashanti Region, which has historically been their stronghold, but with a reduced margin. The Eastern Region, traditionally split, swung toward the NDC. The Greater Accra Region, home to the capital, voted for the NDC with over 55% of votes.",
    kw: ["region","ashanti","volta","accra","northern","eastern","central","western","stronghold","breakdown","regional"]
  },
  {
    id: "el7", src: "Ghana_Election_Result.csv", cat: "Election · Voting Trends",
    text: "Ghana's election history from 1992 to 2024 shows consistent democratic alternation of power between the NDC and NPP. The NDC was founded by Jerry John Rawlings and has won presidential elections in 1992, 1996, 2008, 2012, and 2024. The NPP has won in 2000, 2004, 2016, and 2020. Ghana is widely regarded as one of Africa's most stable multiparty democracies, with peaceful transfers of power.",
    kw: ["history","trend","rawlings","alternation","democracy","fourth republic","1992","1996","2000","2004","2008","2012","peaceful"]
  },
  {
    id: "el8", src: "Ghana_Election_Result.csv", cat: "Election · Electoral Commission",
    text: "The Electoral Commission of Ghana (EC) is the independent constitutional body responsible for conducting all public elections. It is chaired by the Chairperson of the Electoral Commission. The 2024 elections were administered by the EC under Chairperson Jean Mensa. The EC announced results from over 38,000 polling stations across all 16 regions and 275 constituencies of Ghana.",
    kw: ["electoral commission","ec","jean mensa","polling","constituencies","regions","administration","chairperson"]
  },
  {
    id: "bu1", src: "2025-Budget-Statement.pdf", cat: "Budget · Macroeconomic Overview", page: 12,
    text: "Ghana's GDP growth is projected at 4.0% for 2025, recovering from 2.9% in 2024. The total budget size is GH₵ 214.6 billion. Total revenue and grants are projected at GH₵ 152.7 billion (14.7% of GDP). Total expenditure is projected at GH₵ 214.6 billion (20.7% of GDP). The fiscal deficit target is 4.0% of GDP, significantly down from 7.3% in the prior year. The primary balance target is a surplus of 1.5% of GDP, reflecting Ghana's ongoing IMF Extended Credit Facility programme commitments.",
    kw: ["gdp","growth","fiscal","deficit","revenue","imf","economy","budget","surplus","primary balance","2025","macro"]
  },
  {
    id: "bu2", src: "2025-Budget-Statement.pdf", cat: "Budget · Education Sector", page: 87,
    text: "The education sector received a total allocation of GH₵ 21.4 billion in the 2025 Budget, representing approximately 15.2% of total government expenditure. This is the single largest sectoral allocation. Key components include: Ghana Education Trust Fund (GETFund) : GH₵ 4.2 billion; Free Senior High School (FSHS) programme : GH₵ 3.8 billion; Basic education capitation grant : GH₵ 1.1 billion; Tertiary education and university infrastructure : GH₵ 2.6 billion; Technical and Vocational Education and Training (TVET) : GH₵ 1.3 billion. The government plans to build 200 new basic school infrastructure units and rehabilitate 500 existing structures.",
    kw: ["education","budget","getfund","shs","free shs","tertiary","university","tvet","allocation","schools","capitation","billion"]
  },
  {
    id: "bu3", src: "2025-Budget-Statement.pdf", cat: "Budget · Health Sector", page: 112,
    text: "The health sector received GH₵ 7.2 billion in the 2025 Budget. Priority areas include: National Health Insurance Authority (NHIA) : GH₵ 2.1 billion; Agenda 111 (district hospitals) : GH₵ 1.8 billion for completing 27 district hospitals; Primary healthcare and community health centres : GH₵ 1.2 billion; Medicines and medical supplies : GH₵ 900 million; Mental health facilities : GH₵ 200 million. The government targets increasing health insurance coverage to 50% of the population by end of 2025.",
    kw: ["health","nhia","hospital","agenda 111","insurance","community","district","medicines","mental","coverage","billion"]
  },
  {
    id: "bu4", src: "2025-Budget-Statement.pdf", cat: "Budget · Public Debt", page: 45,
    text: "Ghana's total public debt stood at GH₵ 721 billion (approximately USD 48 billion) as of end-2024, representing about 65.6% of GDP, down from 88.1% at the peak of the debt crisis in 2022. The 2025 Budget targets a further reduction to below 60% of GDP by end of 2025 through the Domestic Debt Exchange Programme (DDEP), external debt restructuring, and fiscal consolidation. IMF support under the Extended Credit Facility amounts to USD 3 billion over 36 months.",
    kw: ["debt","public debt","imf","ddep","gdp","billion","exchange","credit","restructuring","fiscal","usd","consolidation"]
  },
  {
    id: "bu5", src: "2025-Budget-Statement.pdf", cat: "Budget · Revenue Measures", page: 32,
    text: "The 2025 Budget introduces several revenue enhancement measures: (1) Electronic Levy (E-Levy) rate revised downward to 0.5% on electronic transactions; (2) Introduction of a 5% levy on betting and gaming winnings; (3) Growth and Sustainability Levy on mining companies extended for 2 additional years; (4) Corporate income tax for small and medium enterprises reduced to 20%; (5) Value Added Tax (VAT) threshold raised to GH₵ 500,000 annual turnover; (6) Tax exemptions on locally manufactured goods expanded. Total domestic revenue target is GH₵ 135.2 billion.",
    kw: ["revenue","e-levy","vat","tax","levy","sme","corporate","mining","domestic","electronic","betting","sustainability"]
  },
  {
    id: "bu6", src: "2025-Budget-Statement.pdf", cat: "Budget · Infrastructure & Roads", page: 134,
    text: "Infrastructure and roads received GH₵ 9.1 billion in the 2025 Budget. Flagship projects include: Accra-Tema Motorway Extension Phase II : GH₵ 1.4 billion; Rehabilitation of 4,500 km of feeder roads nationwide : GH₵ 2.2 billion; Accra Inner City Roads rehabilitation : GH₵ 800 million; Kumasi Urban Roads : GH₵ 600 million; Continuation of the 1-District-1-Factory programme targeting 40 new factories : GH₵ 1.1 billion.",
    kw: ["infrastructure","roads","motorway","factory","construction","accra","tema","kumasi","feeder","district","rehab"]
  },
  {
    id: "bu7", src: "2025-Budget-Statement.pdf", cat: "Budget · Agriculture Sector", page: 98,
    text: "The agriculture sector was allocated GH₵ 3.8 billion in 2025, focused on: Planting for Food and Jobs (PFJ) Phase II : GH₵ 1.2 billion; Cocoa sector support (COCOBOD) : GH₵ 900 million; Irrigation infrastructure development : GH₵ 600 million; Fertiliser and seed subsidy programme : GH₵ 400 million; Livestock and poultry development : GH₵ 300 million. The government targets a 5% growth in agricultural GDP and aims to make Ghana self-sufficient in rice production by 2027.",
    kw: ["agriculture","farming","cocoa","cocobod","planting","pfj","food","irrigation","fertiliser","rice","livestock","sector"]
  },
  {
    id: "bu8", src: "2025-Budget-Statement.pdf", cat: "Budget · Energy Sector", page: 148,
    text: "The energy sector received GH₵ 4.5 billion in 2025. Key priorities: Power generation capacity : GH₵ 1.6 billion towards adding 500 MW of renewable energy; Ghana Grid Company (GRIDCo) transmission infrastructure : GH₵ 800 million; Electrification of remaining communities under the Self-Help Electrification Programme (SHEP) : GH₵ 500 million; LPG cylinder promotion programme : GH₵ 300 million. Power sector debt to IPPs stands at approximately USD 2.1 billion.",
    kw: ["energy","power","electricity","renewable","gridco","shep","lpg","ipp","generation","transmission","megawatt","sector"]
  },
  {
    id: "bu9", src: "2025-Budget-Statement.pdf", cat: "Budget · Social Protection", page: 165,
    text: "Social protection programmes received GH₵ 5.6 billion in 2025. Key programmes include: Livelihood Empowerment Against Poverty (LEAP) : GH₵ 900 million, targeting 400,000 households; School feeding programme : GH₵ 1.1 billion, covering 2.2 million pupils; National Youth Employment Programme (NYEP) : GH₵ 700 million; Disability fund : GH₵ 200 million; Senior citizens support programme : GH₵ 150 million.",
    kw: ["social protection","leap","school feeding","poverty","youth","employment","disability","nyep","households","welfare","beneficiaries"]
  },
  {
    id: "bu10", src: "2025-Budget-Statement.pdf", cat: "Budget · Digital Economy", page: 178,
    text: "The digital economy and ICT sector received GH₵ 1.8 billion in 2025. Priority areas: National broadband infrastructure expansion : GH₵ 600 million; Ghana.gov digital services platform : GH₵ 250 million; Cybersecurity infrastructure (Cyber Security Authority) : GH₵ 180 million; Tech hubs and innovation centres : GH₵ 200 million including support for Academic City and other tertiary tech institutions; Digitisation of government records : GH₵ 170 million.",
    kw: ["digital","ict","broadband","cybersecurity","tech","innovation","internet","ghana.gov","hub","platform","penetration"]
  },
  {
    id: "bu11", src: "2025-Budget-Statement.pdf", cat: "Budget · Employment & Labour", page: 155,
    text: "The 2025 Budget projects the creation of 500,000 new jobs across formal and informal sectors. Key employment measures: One District One Factory (1D1F) : targeted to employ 200,000; TVET expansion with industry partnerships : 50,000 graduates; Government hiring in health and education : 30,000 new staff; AgriPreneurship programme for youth in agriculture : 100,000 jobs. The youth unemployment rate stands at 13.4% nationally and 19.8% in urban areas.",
    kw: ["employment","jobs","unemployment","youth","labour","factory","1d1f","tvet","agriculture","creation","hiring"]
  },
  {
    id: "bu12", src: "2025-Budget-Statement.pdf", cat: "Budget · Inflation & Monetary", page: 22,
    text: "Ghana's inflation rate stood at 23.2% as of December 2024, down from a peak of 54.1% in December 2022. The Bank of Ghana's monetary policy rate (MPR) was 27% as at the 2025 Budget presentation. The government projects end-2025 inflation at 11.9% and targets returning to single-digit inflation by 2026. The Ghana cedi depreciated approximately 18.5% against the US dollar in 2024.",
    kw: ["inflation","monetary","cedi","depreciation","bank of ghana","mpr","rate","price","2024","2022","currency","policy"]
  },
  {
    id: "bu13", src: "2025-Budget-Statement.pdf", cat: "Budget · Public Sector Wages", page: 72,
    text: "The 2025 Budget allocates GH₵ 38.2 billion for compensation of employees (public sector wages and salaries), representing 17.8% of total expenditure. This includes: Cost of living adjustment (COLA) increase of 18% for civil servants; Minimum wage raised to GH₵ 18.15 per day; Payment of all outstanding salary arrears to healthcare workers; Implementation of the new nursing and allied health salary structure.",
    kw: ["wages","salary","compensation","civil service","cola","minimum wage","ssss","nurse","health","workers","arrears","public sector"]
  },
  {
    id: "bu14", src: "2025-Budget-Statement.pdf", cat: "Budget · IMF Programme", page: 18,
    text: "Ghana's IMF Extended Credit Facility (ECF) programme, approved in May 2023, provides USD 3 billion over 36 months in exchange for fiscal consolidation and structural reforms. As of the 2025 Budget presentation, Ghana had successfully completed four programme reviews. Key conditions include: maintaining the primary balance target, implementing the DDEP, restructuring external commercial debt (Eurobonds), and strengthening revenue administration through the Ghana Revenue Authority (GRA).",
    kw: ["imf","ecf","programme","review","eurobond","restructuring","gra","revenue authority","fiscal","reform","conditionality","2023"]
  },
  {
    id: "ac1", src: "ACity Knowledge Base", cat: "ACity · Overview",
    text: "Academic City University College (ACity) is a private university located in Accra, Ghana, founded in 2018. It focuses on technology, engineering, business, and social sciences. ACity is accredited by the National Accreditation Board (NAB) of Ghana and is known for its industry-aligned curriculum. The 2025 Ghana Budget specifically allocated funds to ACity and other tech institutions through the digital economy ICT tech hubs budget line of GH₵ 200 million.",
    kw: ["acity","academic city","university","accra","ghana","nab","accreditation","founded","2018","tech","industry"]
  },
  {
    id: "ac2", src: "ACity Knowledge Base", cat: "ACity · CS4241 Course",
    text: "CS4241: Introduction to Artificial Intelligence is a third/fourth-year course in the Faculty of Computational Sciences and Informatics at ACity. Topics include: search algorithms, knowledge representation, machine learning (supervised and unsupervised), neural networks, natural language processing, computer vision, AI ethics, and applied AI tools. The 2026 end-of-semester exam requires students to build a RAG (Retrieval-Augmented Generation) application using the Ghana Election CSV and 2025 Budget PDF as data sources.",
    kw: ["cs4241","artificial intelligence","ai","machine learning","neural","nlp","rag","exam","faculty","course","2026","computational"]
  },
  {
    id: "ac3", src: "ACity Knowledge Base", cat: "RAG System · Explanation",
    text: "Retrieval-Augmented Generation (RAG) is an AI architecture that combines a retrieval system with a generative language model. The pipeline: (1) Document ingestion and chunking : splitting documents into segments of 200–500 tokens with overlap; (2) Embedding : encoding chunks into vector representations using models like sentence-transformers; (3) Vector storage : storing embeddings in databases like FAISS or ChromaDB; (4) Retrieval : for a user query, compute similarity (cosine similarity) to find top-k relevant chunks; (5) Generation : inject retrieved chunks into a prompt and pass to an LLM for response. RAG significantly reduces hallucination by grounding responses in actual retrieved documents.",
    kw: ["rag","retrieval","augmented","generation","embedding","vector","chunking","faiss","chroma","cosine","similarity","hallucination","llm","pipeline"]
  }
];
