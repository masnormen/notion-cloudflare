import Link from "next/link";
import cn from "../lib/cn";

interface ArticleCardProps {
  thumbnail: string;
  title: string;
  summary?: string;
  date?: string;
  tags?: string[];
  href: string;
  index: number;
}

const colorScheme = ["bg-background", "bg-secondary", "bg-quaternary"] as const;

function ArticleCard({ thumbnail, title, summary, index, date, tags = [], href, ...rest }: ArticleCardProps) {
  return (
    <Link href={href}>
      <article
        className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-stroke bg-stroke shadow-md duration-200 hover:border-highlight hover:shadow-2xl hover:shadow-secondary md:hover:scale-[1.02]"
        {...rest}
      >
        {/* Thumbnail image */}
        <div
          className="aspect-video w-full rounded-t-xl bg-cover bg-center duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
        />

        {/* Post metadata */}
        <div
          className={cn(
            "z-10 flex w-full flex-1 flex-col justify-end space-y-4 border-t border-stroke p-6 text-stroke duration-500 group-hover:border-highlight",
            colorScheme[index % 3]
          )}
        >
          {/* Title */}
          <h2 className="font-semibold line-clamp-2 md:text-2xl">{title}</h2>

          {/* Summary */}
          {summary && summary.length > 0 && <div className="text-sm line-clamp-2">{summary.substring(0, 200)}</div>}

          {/* Tags & Date */}
          <div className="!mt-6 flex flex-row items-center justify-between">
            {tags.length > 0 && (
              <div className="flex flex-wrap space-x-3 text-xs">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="h-fit w-fit rounded-2xl border border-stroke bg-tertiary px-2 pb-1.5 pt-2 font-mono font-bold uppercase leading-none  text-stroke"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {date && <div className="font-mono text-sm font-bold">{date}</div>}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ArticleCard;