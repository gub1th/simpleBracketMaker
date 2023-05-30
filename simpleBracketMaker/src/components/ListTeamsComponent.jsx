function ListTeamsComponent ({teamData, deleteTeam}) {
    return (
        <div>
            <ul className='listGroup'>
                {teamData.map(
                team => <li className ="list-group-item list-group-item-primary" key={team.teamName}>
                            {team.displayName()}
                            <button onClick={() => deleteTeam(team.teamName)} className="btn btn-danger">Delete</button>
                        </li>
                )}
            </ul>
        </div>
    )
}

export default ListTeamsComponent;