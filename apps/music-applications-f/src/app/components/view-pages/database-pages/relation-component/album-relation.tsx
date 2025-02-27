import { AlbumProperties, Neo4jDbItem } from '../../../../types';
import ToRelation from './to-relation';

const AlbumRelation = ({
  item,
  routingCallback,
}: {
  item: Neo4jDbItem;
  routingCallback: (type: string, name: string) => void;
}) => {
  const authorToArtistRelations = item.relations.filter(
    (relation: { type: string; target: Neo4jDbItem }) =>
      relation.type === 'Author' && relation.target.type === 'Artist'
  );
  const containsToTrackRelations = item.relations.filter(
    (relation: { type: string; target: Neo4jDbItem }) =>
      relation.type === 'Contains' && relation.target.type === 'Track'
  );
  const appearedAtToArtistRelations = item.relations.filter(
    (relation: { type: string; target: Neo4jDbItem }) =>
      relation.type === 'AppearedAt' && relation.target.type === 'Artist'
  );

  return (
    <div className="database-item-page-text">
      <div className="database-item-name-author-text">
        <div className="database-item-name-text">{item.name.toUpperCase()}</div>
        {authorToArtistRelations.length > 0 ? (
          <div className="database-item-author-toartist-relation">
            <div className="database-item-author-text">
              <div className="database-item-by">By</div>
              {authorToArtistRelations.map(
                (
                  relation: { type: string; target: Neo4jDbItem },
                  index: number
                ) => {
                  return (
                    <ToRelation
                      routingCallback={routingCallback}
                      target={relation.target}
                      key={index}
                    ></ToRelation>
                  );
                }
              )}
            </div>
            <div>
              <div className="database-item-by">Added by: </div>
              <div>{item.properties.added_by}</div>
            </div>
            <div className="database-item-author-text">
              <div className="database-item-author-description-text">
                <div className="database-item-release">Release:</div>{' '}
                {(item.properties as AlbumProperties).release}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="database-item-description-text">
        <div className="database-item-contains-totrack-text">
          {containsToTrackRelations.length > 0 ? (
            <div>
              <div className="database-item-contains-head-text">Tracks</div>
              <div className="database-item-scroll">
                {containsToTrackRelations.map(
                  (
                    relation: { type: string; target: Neo4jDbItem },
                    index: number
                  ) => {
                    return (
                      <ToRelation
                        routingCallback={routingCallback}
                        target={relation.target}
                        key={index}
                      ></ToRelation>
                    );
                  }
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="database-item-appearedat-toartist-text">
          {appearedAtToArtistRelations.length > 0 ? (
            <div>
              <div className="database-item-contains-head-text">
                AppearedArtists
              </div>
              {appearedAtToArtistRelations.map(
                (
                  relation: { type: string; target: Neo4jDbItem },
                  index: number
                ) => {
                  return (
                    <ToRelation
                      routingCallback={routingCallback}
                      target={relation.target}
                      key={index}
                    ></ToRelation>
                  );
                }
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumRelation;
