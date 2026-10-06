// Answers may be a string or an array of blocks rendered by FaqAnswer.vue:
// { p }, { ul: [] }, { table: { head: [], rows: [[]] } }

export const investmentLimitTable = {
  head: ["Your situation", "Your 12-month limit"],
  rows: [
    [
      "Either your annual income or your net worth is under $124,000",
      "The greater of $2,500 or 5% of the greater of your annual income or net worth",
    ],
    [
      "Both your annual income and your net worth are $124,000 or more",
      "10% of the greater of your annual income or net worth, up to a maximum of $124,000",
    ],
  ],
};

export const investmentLimitFaqs = [
  {
    question: "Is there a limit on how much I can invest through Wunderfund?",
    answer:
      "Yes, unless you are an accredited investor. Non-accredited investors can only invest a certain amount in Regulation Crowdfunding offerings in any 12-month period. The cap is set by law to protect investors. Wunderfund does not choose it.",
  },
  {
    question: "How is my limit calculated?",
    answer: [
      { p: "Your limit depends on your annual income and your net worth:" },
      { table: investmentLimitTable },
      {
        p: "Example 1: Your annual income is $50,000 and your net worth is $80,000. Both are under $124,000, so your limit is the greater of $2,500 or 5% of $80,000 ($4,000). Your limit is $4,000.",
      },
      {
        p: "Example 2: Your annual income is $150,000 and your net worth is $200,000. Both are at least $124,000, so your limit is 10% of $200,000. Your limit is $20,000.",
      },
      {
        p: "Example 3: Your annual income is $1,500,000 and your net worth is $2,000,000. 10% of $2,000,000 is $200,000, but the law caps the limit at $124,000. Your limit is $124,000.",
      },
    ],
  },
  {
    question: "Does the limit apply only to investments made on Wunderfund?",
    answer:
      "No. The limit covers all Regulation Crowdfunding investments you make in a 12-month period, on any funding portal or broker-dealer platform. When you invest through Wunderfund, you must tell us how much you have invested in other Regulation Crowdfunding offerings in the past 12 months.",
  },
  {
    question: "How do I calculate my annual income and net worth?",
    answer: [
      {
        p: 'You calculate them the same way as when deciding if someone is an "accredited investor" under Rule 501 of Regulation D.',
      },
      {
        p: "Do not count your primary residence as an asset when calculating net worth. Generally, the mortgage or other debt on it is not counted as a liability either, up to the home's fair market value. Debt above the home's value, and certain debt taken on in the 60 days before your investment, may need to be counted.",
      },
      {
        p: "Spouses or spousal equivalents may add their income or net worth together. If you do, the combined investments of both of you cannot be more than the limit that applies to the joint figure.",
      },
    ],
  },
  {
    question: "Do the limits apply to accredited investors?",
    answer:
      "No. Since March 15, 2021, accredited investors (as defined in Rule 501(a) of Regulation D) have no investment limit in Regulation Crowdfunding offerings.",
  },
  {
    question: "Do the limits apply to companies, trusts, or other entities?",
    answer:
      "No. The limits apply only to individuals (natural persons). Entities are not subject to them.",
  },
  {
    question: "How does Wunderfund check that I'm within my limit?",
    answer:
      "Every time you make an investment commitment, Wunderfund must have a reasonable basis to believe you are within your limit. We may rely on what you tell us about your income, net worth, and other Regulation Crowdfunding investments, unless we have reason to doubt that information. Wunderfund may reject any investment commitment that we believe would put you over your limit. It is your responsibility to give accurate information.",
  },
  {
    question: "Can these limits change?",
    answer:
      "Yes. The SEC must review and adjust the dollar amounts for inflation at least once every five years. The SEC may also change the rules. Wunderfund will update this page when they change.",
  },
  {
    question: "Should I invest up to my limit?",
    answer:
      "Not necessarily. Your limit is the most you are allowed to invest. It is not a recommendation. Regulation Crowdfunding investments are speculative and illiquid, and you could lose your entire investment. Only invest money you can afford to lose. Think about whether the investment fits your overall finances, and speak with a financial, tax, or legal professional if you're unsure.",
  },
];

export const offeringLimitFaqs = [
  {
    question:
      "How much can a company raise through Regulation Crowdfunding on Wunderfund?",
    answer:
      "An issuer can raise up to $5,000,000 in any 12-month period through Regulation Crowdfunding (Rule 100(a)(1) of Regulation Crowdfunding). Wunderfund can't permit an offering to exceed this limit, and the SEC sets the limit, not Wunderfund.",
  },
  {
    question: "What counts toward the $5,000,000 limit?",
    answer: [
      {
        p: "The limit covers all securities the issuer sold under Section 4(a)(6) of the Securities Act in the 12 months before the offer or sale, plus the amount sought in the current offering. It includes:",
      },
      {
        ul: [
          "Offerings on any other funding portal or broker-dealer platform, not only Wunderfund.",
          "Sales by companies the issuer controls or that are under common control with it, and by any predecessor.",
        ],
      },
      {
        p: "Offerings under other exemptions, such as Regulation D or Regulation A, do not count toward this limit. Those offerings have their own rules, and the issuer must make sure the offerings are not integrated in a way that violates the securities laws.",
      },
    ],
  },
  {
    question: "Is there a minimum amount an issuer must raise?",
    answer:
      "Yes. Each issuer sets a target offering amount and a deadline for the offering. The issuer receives funds only if the total commitments reach the target by the deadline. If they don't, the offering is cancelled and all investment commitments are returned to investors. Wunderfund holds investor funds with a qualified third-party bank or escrow agent until the offering closes. We do not release them to the issuer before then.",
  },
  {
    question: "Can an issuer raise more than its target amount?",
    answer:
      'Possibly. An issuer may accept "oversubscriptions" up to a maximum offering amount stated in the offering materials. The maximum can\'t exceed $5,000,000 for the 12-month period. If an issuer allows oversubscriptions, it must say how it will allocate them (for example, first-come, first-served, pro rata, or at its discretion). Investors have to be told this before they commit.',
  },
  {
    question: "Can the offering terms change after I invest?",
    answer:
      "If the issuer makes a material change to the offering, such as the terms, the use of proceeds, or the target amount, you'll be notified. You'll then have at least five business days to reconfirm your commitment. If you don't reconfirm, your commitment is cancelled and your money is returned. You may also cancel your commitment for any reason until 48 hours before the deadline.",
  },
  {
    question:
      "Does the size of the offering affect what financial information I'll see?",
    answer: [
      {
        p: "Yes. The larger the amount an issuer raises, the more rigorous the financial statements it must provide. The tiers below are based on the target offering amount in the 12-month period:",
      },
      {
        table: {
          head: ["Offering size", "Financial information required"],
          rows: [
            [
              "$124,000 or less",
              "Income tax return information (total income, taxable income, total tax) certified by the issuer's principal executive officer. Financial statements certified by the principal executive officer may also be used. Reviewed or audited statements may be given instead.",
            ],
            [
              "More than $124,000, up to $618,000",
              "Financial statements reviewed by an independent public accountant. Audited statements may be given instead.",
            ],
            [
              "More than $618,000",
              "Financial statements audited by an independent public accountant.",
            ],
          ],
        },
      },
      {
        p: "First-time Regulation Crowdfunding issuers that are seeking more than $618,000 and up to $1,235,000 may provide reviewed statements, rather than audited ones, unless audited statements already exist.",
      },
      {
        p: "Unaudited financial statements carry more risk. Read the financial disclosures carefully and consider whether they give you enough information to make a decision.",
      },
    ],
  },
  {
    question: "Does a higher offering amount mean the investment is safer?",
    answer:
      "No. The amount an issuer is allowed to raise tells you nothing about the quality of the business or the likelihood of a return. Regulation Crowdfunding investments are speculative, illiquid, and often in early-stage companies. You could lose your entire investment. Wunderfund does not endorse or recommend any issuer or offering, and we do not guarantee the accuracy of the issuer's disclosures.",
  },
  {
    question: "Which companies can use Regulation Crowdfunding?",
    answer: [
      {
        p: "Regulation Crowdfunding is available to U.S. companies. Certain issuers are not eligible, including:",
      },
      {
        ul: [
          "Non-U.S. companies.",
          "Companies that already report under the Securities Exchange Act of 1934.",
          "Investment companies and companies registered under the Investment Company Act.",
          "Blank-check or shell companies.",
          "Companies that have failed to file the annual reports required by Regulation Crowdfunding in the past two years.",
          'Companies subject to disqualification under the "bad actor" rules.',
        ],
      },
    ],
  },
  {
    question: "Can these limits change?",
    answer:
      "Yes. The SEC reviews the dollar thresholds at least every five years and adjusts them for inflation. The SEC can also amend the rules. Wunderfund will update this page when the numbers change.",
  },
];
