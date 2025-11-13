// AlgoliaSearch.tsx - React component for Algolia InstantSearch
import React from 'react';
import {algoliasearch} from 'algoliasearch';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  Pagination,
  RefinementList,
} from 'react-instantsearch';

// Initialize Algolia client
const searchClient = algoliasearch(
  "GC5TS4PFK2",
  "05ab21682a73a5f888b8d2f92ddfbd06"
);

// Custom Hit component to display search results
function Hit({ hit }: { hit: any }) {
  return (
    <article className="hit">
      <h3>
        <Highlight attribute="title" hit={hit} />
      </h3>
      <p>
        <Highlight attribute="description" hit={hit} />
      </p>
    </article>
  );
}

// Main search component
export default function AlgoliaSearch() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="astro_mealsdb_content"
    >
      <Configure hitsPerPage={10} />
      
      <div className="search-container">
        <SearchBox
          placeholder="Search..."
          classNames={{
            root: 'search-box',
            input: 'search-input',
            submit: 'search-submit',
            reset: 'search-reset',
          }}
        />

        {/* Optional: Add filters */}
        <aside className="filters">
          <h3>Filters</h3>
          <RefinementList attribute="category" />
        </aside>

        <div className="results">
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </div>
    </InstantSearch>
  );
}