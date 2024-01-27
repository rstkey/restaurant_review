import { AppBar } from "@/components/AppBar";
import ReviewCard from "@/components/ReviewCard";
import { useEffect, useState } from "react";
import { Review, ReviewVariant } from "@/models/Review";
import * as web3 from "@solana/web3.js";
import { fetchReviews } from "@/util/fetchReviews";
import { useWallet } from "@solana/wallet-adapter-react";
import ReviewForm from "@/components/Form";

// Add solana program ID here
const REVIEW_PROGRAM_ID = "EH92vyc4PaqfiH7Cfr1e2nXD5KHX73eHTunXMuJEESQZ";

export default function Home() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const { publicKey, sendTransaction } = useWallet();

  const [txid, setTxid] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [variant, setVariant] = useState(ReviewVariant.add);

  useEffect(() => {
    const fetchAccounts = async () => {
      const reviews = await fetchReviews(REVIEW_PROGRAM_ID, connection);
      setReviews(reviews);
    };
    fetchAccounts();
  }, []);

  const handleSubmit = () => {
    const review = new Review(title, rating, description, location);
    handleTransactionSubmit(review);
  };

  const handleTransactionSubmit = async (review: Review) => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }

    const buffer = review.serialize(variant);
    const transaction = new web3.Transaction();

    const [pda] = await web3.PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), Buffer.from(review.title)],
      new web3.PublicKey(REVIEW_PROGRAM_ID)
    );

    const instruction = createInstruction({
      publicKey,
      pda,
      buffer,
      variant,
    });

    transaction.add(instruction);

    try {
      let txid = await sendTransaction(transaction, connection);
      setTxid(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
      clearForm();
    } catch (e) {
      console.log(JSON.stringify(e));
      alert(JSON.stringify(e));
    }
  };

  const createInstruction = ({
    publicKey,
    pda,
    buffer,
    variant,
  }: {
    publicKey: web3.PublicKey;
    pda: web3.PublicKey;
    buffer: Buffer;
    variant: ReviewVariant;
  }) => {
    const keys = [
      {
        pubkey: publicKey,
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: pda,
        isSigner: false,
        isWritable: true,
      },
    ];
    if (variant === ReviewVariant.add) {
      keys.push({
        pubkey: web3.SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      });
    }
    return new web3.TransactionInstruction({
      keys: keys,
      data: buffer,
      programId: new web3.PublicKey(REVIEW_PROGRAM_ID),
    });
  };

  const clearForm = () => {
    setTitle("");
    setRating(0);
    setDescription("");
    setLocation("");
    setVariant(ReviewVariant.add);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <AppBar />
      </div>

      <div className="after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <ReviewForm
          title={title}
          description={description}
          location={location}
          rating={rating}
          variant={variant}
          setTitle={setTitle}
          setDescription={setDescription}
          setLocation={setLocation}
          setRating={setRating}
          handleSubmit={handleSubmit}
        />
      </div>

      {txid && <div>{txid}</div>}

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        {reviews &&
          reviews.map((review, index) => {
            return (
              <ReviewCard
                key={index}
                review={review}
                onEditClick={() => {
                  setTitle(review.title);
                  setRating(review.rating);
                  setDescription(review.description);
                  setLocation(review.location);
                  setVariant(ReviewVariant.update);
                }}
              />
            );
          })}
      </div>
    </main>
  );
}
